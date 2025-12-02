import { prisma } from "../lib/prisma";

export interface AnalyticsKpis {
  period: {
    from: Date;
    to: Date;
  };
  business: {
    totalRevenuePaid: number;
    pendingAmount: number;
    overdueAmount: number;
    invoicesByStatus: Record<
      string,
      {
        count: number;
        totalAmount: number;
      }
    >;
    totalOrders: number;
    ordersByStatus: Record<string, number>;
    avgOrderValue: number | null;
  };
  operations: {
    steps: Array<{
      process: string;
      count: number;
      completedCount: number;
      avgDurationHours: number | null;
      stuckCount: number;
    }>;
  };
  clients: {
    topClients: Array<{
      clientId: number;
      clinicName: string;
      revenueCurrent: number;
      ordersCurrent: number;
    }>;
  };
}

/**
 * Compute analytics KPIs for the given period.
 * Pure DB/JS logic – no AI involved.
 */
export async function computeKpis(from: Date, to: Date): Promise<AnalyticsKpis> {
  const now = new Date();

  // Run queries in parallel to keep it fast
  const [
    invoicesByStatus,
    overdueInvoicesAgg,
    ordersGroup,
    trackingEntries,
    topClientRevenueGroup,
  ] = await Promise.all([
    // Invoices grouped by status (for sums + counts)
    prisma.invoice.groupBy({
      by: ["status"],
      _sum: { totalPrice: true },
      _count: { _all: true },
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
    }),

    // Overdue invoices (not PAID, dueDate < now)
    prisma.invoice.aggregate({
      _sum: { totalPrice: true },
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
        status: {
          not: "PAID",
        },
        dueDate: {
          lt: now,
        },
      },
    }),

    // Orders grouped by status (count + sum of totalPrice)
    prisma.order.groupBy({
      by: ["status"],
      _count: { _all: true },
      _sum: { totalPrice: true },
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
    }),

    // OrderTracking entries in period (for per-step durations)
    prisma.orderTracking.findMany({
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
      select: {
        process: true,
        startDate: true,
        endDate: true,
        status: true,
      },
    }),

    // Top clients by PAID invoice revenue in period
    prisma.invoice.groupBy({
      by: ["clientId"],
      _sum: { totalPrice: true },
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
        status: "PAID",
      },
      orderBy: {
        _sum: {
          totalPrice: "desc",
        },
      },
      take: 5,
    }),
  ]);

  // ---- Business: invoices & orders ----

  let totalRevenuePaid = 0;
  let pendingAmount = 0;
  const invoicesStatusMap: AnalyticsKpis["business"]["invoicesByStatus"] = {};

  for (const row of invoicesByStatus) {
    const status = row.status; // PaymentStatus enum as string
    const count = row._count._all;
    const sum = Number(row._sum.totalPrice || 0);

    invoicesStatusMap[status] = {
      count,
      totalAmount: sum,
    };

    if (status === "PAID") {
      totalRevenuePaid += sum;
    } else if (status === "PENDING" || status === "PARTIAL") {
      pendingAmount += sum;
    }
  }

  const overdueAmount = Number(overdueInvoicesAgg._sum.totalPrice || 0);

  let totalOrders = 0;
  let ordersTotalPrice = 0;
  const ordersByStatus: Record<string, number> = {};

  for (const row of ordersGroup) {
    const status = row.status; // ProcessStatus enum as string
    const count = row._count._all;
    const sum = Number(row._sum.totalPrice || 0);

    ordersByStatus[status] = count;
    totalOrders += count;
    ordersTotalPrice += sum;
  }

  const avgOrderValue =
    totalOrders > 0 ? Number((ordersTotalPrice / totalOrders).toFixed(2)) : null;

  // ---- Operations: per-step stats from OrderTracking ----

  type StepStats = {
    process: string;
    count: number;
    completedCount: number;
    totalDurationHours: number;
    durationSamples: number;
    stuckCount: number;
  };

  const stepMap = new Map<string, StepStats>();

  for (const t of trackingEntries) {
    const key = t.process || "Unknown";
    let stats = stepMap.get(key);
    if (!stats) {
      stats = {
        process: key,
        count: 0,
        completedCount: 0,
        totalDurationHours: 0,
        durationSamples: 0,
        stuckCount: 0,
      };
      stepMap.set(key, stats);
    }

    stats.count += 1;

    const isCompleted = t.status === "COMPLETED";
    const isStuck = t.status !== "COMPLETED" && !t.endDate;

    if (isCompleted) {
      stats.completedCount += 1;
    }
    if (isStuck) {
      stats.stuckCount += 1;
    }

    if (t.startDate && t.endDate) {
      const diffMs = t.endDate.getTime() - t.startDate.getTime();
      const hours = diffMs / (1000 * 60 * 60);
      if (hours >= 0) {
        stats.totalDurationHours += hours;
        stats.durationSamples += 1;
      }
    }
  }

  const steps = Array.from(stepMap.values()).map((s) => ({
    process: s.process,
    count: s.count,
    completedCount: s.completedCount,
    avgDurationHours:
      s.durationSamples > 0
        ? Number((s.totalDurationHours / s.durationSamples).toFixed(1))
        : null,
    stuckCount: s.stuckCount,
  }));

  // ---- Clients: top clients by revenue ----

  const topClientIds = topClientRevenueGroup.map((g) => g.clientId);

  let topClients: AnalyticsKpis["clients"]["topClients"] = [];

  if (topClientIds.length > 0) {
    const [topClientUsers, ordersByClientGroup] = await Promise.all([
      prisma.user.findMany({
        where: {
          id: {
            in: topClientIds,
          },
        },
        select: {
          id: true,
          clinicName: true,
        },
      }),
      prisma.order.groupBy({
        by: ["userId"],
        _count: { _all: true },
        where: {
          createdAt: {
            gte: from,
            lt: to,
          },
          userId: {
            in: topClientIds,
          },
        },
      }),
    ]);

    const userNameMap = new Map<number, string>();
    for (const u of topClientUsers) {
      userNameMap.set(u.id, u.clinicName);
    }

    const ordersCountMap = new Map<number, number>();
    for (const g of ordersByClientGroup) {
      ordersCountMap.set(g.userId, g._count._all);
    }

    topClients = topClientRevenueGroup.map((g) => {
      const clientId = g.clientId;
      const clinicName = userNameMap.get(clientId) || "Unknown clinic";
      const revenueCurrent = Number(g._sum.totalPrice || 0);
      const ordersCurrent = ordersCountMap.get(clientId) || 0;

      return {
        clientId,
        clinicName,
        revenueCurrent,
        ordersCurrent,
      };
    });
  }

  return {
    period: { from, to },
    business: {
      totalRevenuePaid,
      pendingAmount,
      overdueAmount,
      invoicesByStatus: invoicesStatusMap,
      totalOrders,
      ordersByStatus,
      avgOrderValue,
    },
    operations: {
      steps,
    },
    clients: {
      topClients,
    },
  };
}
