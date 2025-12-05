import { prisma } from "../lib/prisma";
import logger from "../utils/logger.util";

//============= CONSTANTS ==============
const ANALYTICS_CURRENCY = "EGP";

// ============ TYPE DEFINITIONS ============
type CurrencyCode = "EGP" | "USD" | "EUR" | string;

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[] | string;
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartConfig {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ProcessMetrics {
  process: string;
  completionRate: number;
  totalItems: number;
  completedItems: number;
  stuckItems: number;
  averageDuration: number;
  healthStatus: "healthy" | "warning" | "critical";
  healthReason: string;
}

export interface ClientMetric {
  clientId: number;
  clientName: string;
  totalRevenue: number;
  orderCount: number;
  revenuePercentage: number;
}

export interface BusinessMetrics {
  revenue: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  invoices: {
    byStatus: Record<
      string,
      { count: number; amount: number; percentage: number }
    >;
    chartData: ChartConfig;
  };
  orders: {
    byStatus: Record<string, { count: number; percentage: number }>;
    totalOrders: number;
    averageOrderValue: number;
    chartData: ChartConfig;
  };
}

export interface OperationsMetrics {
  processes: ProcessMetrics[];
  overallHealthStatus: "healthy" | "warning" | "critical";
  totalOrdersInProgress: number;
  chartData: {
    completion: ChartConfig;
    stuckItems: ChartConfig;
  };
}

export interface TrendMetrics {
  daily: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  chartData: ChartConfig;
}

export interface Insight {
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  metricValue: number;
  metricUnit: string;
}

export interface KPIResponse {
  period: DateRange;
  business: BusinessMetrics;
  operations: OperationsMetrics;
  clients: {
    topClients: ClientMetric[];
    concentrationPercentage: number;
    chartData: ChartConfig;
  };
  trends: TrendMetrics;
  insights: Insight[];
  metadata: {
    generatedAt: string;
    executionTimeMs: number;
    currency: CurrencyCode;
  };
}

// ============ UTILITY FUNCTIONS ============

function calculatePercentage(value: number, total: number): number {
  return total === 0 ? 0 : Math.round((value / total) * 10000) / 100;
}

function formatCurrency(cents: number): number {
  return Math.round((cents / 100) * 100) / 100;
}

function getColorByStatus(status: string): string {
  const colorMap: Record<string, string> = {
    PAID: "rgba(34, 197, 94, 0.8)",
    PENDING: "rgba(245, 158, 11, 0.8)",
    PARTIAL: "rgba(59, 130, 246, 0.8)",
    COMPLETED: "rgba(34, 197, 94, 0.8)",
    INPROGRESS: "rgba(59, 130, 246, 0.8)",
    CANCELLED: "rgba(239, 68, 68, 0.8)",
  };
  return colorMap[status] || "rgba(107, 114, 128, 0.8)";
}

function calculateHealthStatus(
  completionRate: number,
  stuckItems: number
): { status: "healthy" | "warning" | "critical"; reason: string } {
  if (completionRate > 80 && stuckItems < 2) {
    return {
      status: "healthy",
      reason: "Completion above 80%, minimal stuck items",
    };
  }
  if (completionRate >= 60 && stuckItems < 6) {
    return {
      status: "warning",
      reason: "Completion between 60-80% or moderate stuck items",
    };
  }
  return {
    status: "critical",
    reason: "Completion below 60% or high stuck items",
  };
}

// ============ MAIN ANALYTICS SERVICE ============

export async function computeKpisOptimized(
  startDate: Date,
  endDate: Date
): Promise<KPIResponse> {
  const startTime = Date.now();

  try {
    logger.info(
      `Analytics Service: Computing KPIs from ${startDate.toISOString()} to ${endDate.toISOString()}`
    );

    // Parallel queries (7 simultaneous)
    const [
      invoiceStats,
      orderStats,
      processTrackingStats,
      topClientsData,
      dailyTrendData,
      allOrders,
      allInvoices,
    ] = await Promise.all([
      // Query 1: Invoice statistics by status
      prisma.invoice.groupBy({
        by: ["status"],
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        _count: true,
        _sum: { totalPrice: true },
      }),

      // Query 2: Order statistics by status
      prisma.order.groupBy({
        by: ["status"],
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        _count: true,
        _sum: { totalPrice: true },
      }),

      // Query 3: Process tracking statistics
      prisma.orderTracking.groupBy({
        by: ["process", "status"],
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        _count: true,
      }),

      // Query 4: Top clients by revenue
      prisma.invoice.groupBy({
        by: ["clientId"],
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        _sum: { totalPrice: true },
        _count: true,
        orderBy: { _sum: { totalPrice: "desc" } },
        take: 5,
      }),

      // Query 5: Daily trends
      prisma.order.groupBy({
        by: ["createdAt"],
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        _count: true,
        _sum: { totalPrice: true },
      }),

      // Query 6: All orders for analysis
      prisma.order.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        select: { status: true, totalPrice: true, userId: true },
      }),

      // Query 7: All invoices for analysis
      prisma.invoice.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        include: {
          client: { select: { fullName: true } },
        },
      }),
    ]);
    logger.info(`stats computed for invoices : ${invoiceStats.toString()}}`);
    const businessMetrics = computeBusinessMetrics(invoiceStats, orderStats);
    const operationsMetrics = computeOperationsMetrics(
      processTrackingStats,
      allOrders
    );
    const clientMetrics = computeClientMetrics(topClientsData, allInvoices);
    const trendMetrics = computeTrendMetrics(
      dailyTrendData,
      startDate,
      endDate
    );
    const insights = extractKeyInsights(
      businessMetrics,
      operationsMetrics,
      clientMetrics
    );

    // Format date range label
    const dateDiff = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const label =
      dateDiff <= 7
        ? "Last 7 days"
        : dateDiff <= 30
          ? "Last 30 days"
          : dateDiff <= 90
            ? "Last 90 days"
            : "Last year";

    const response: KPIResponse = {
      period: { from: startDate, to: endDate, label },
      business: businessMetrics,
      operations: operationsMetrics,
      clients: clientMetrics,
      trends: trendMetrics,
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        executionTimeMs: Date.now() - startTime,
        currency: ANALYTICS_CURRENCY,
      },
    };

    logger.info(
      `Analytics Service: KPIs computed in ${response.metadata.executionTimeMs}ms`
    );
    return response;
  } catch (error) {
    logger.error("Analytics Service: Error computing KPIs", error);
    throw error;
  }
}

// ===== HELPER FUNCTIONS =====

function computeBusinessMetrics(
  invoiceStats: any[],
  orderStats: any[]
): BusinessMetrics {
  // Invoice metrics
  const invoicesByStatus: Record<string, any> = {};
  let totalInvoiceAmount = 0;

  invoiceStats.forEach((stat) => {
    const amount = stat._sum.totalPrice || 0;
    invoicesByStatus[stat.status] = {
      count: stat._count,
      amount: amount,
      percentage: 0,
    };
    totalInvoiceAmount += amount;
  });

  Object.keys(invoicesByStatus).forEach((status) => {
    invoicesByStatus[status].percentage = calculatePercentage(
      invoicesByStatus[status].amount,
      totalInvoiceAmount
    );
  });

  // Order metrics
  const ordersByStatus: Record<string, any> = {};
  let totalOrderAmount = 0;
  let totalOrders = 0;

  orderStats.forEach((stat) => {
    const amount = stat._sum.totalPrice || 0;
    ordersByStatus[stat.status] = { count: stat._count, percentage: 0 };
    totalOrderAmount += amount;
    totalOrders += stat._count;
  });

  Object.keys(ordersByStatus).forEach((status) => {
    ordersByStatus[status].percentage = calculatePercentage(
      ordersByStatus[status].count,
      totalOrders
    );
  });

  return {
    revenue: {
      total: totalInvoiceAmount,
      paid: invoicesByStatus.PAID?.amount || 0,
      pending: invoicesByStatus.PENDING?.amount || 0,
      overdue: invoicesByStatus.PARTIAL?.amount || 0,
    },
    invoices: {
      byStatus: invoicesByStatus,
      chartData: {
        labels: Object.keys(invoicesByStatus),
        datasets: [
          {
            label: "Invoice Amount",
            data: Object.values(invoicesByStatus).map((s: any) => s.amount),
            backgroundColor: Object.keys(invoicesByStatus).map((status) =>
              getColorByStatus(status)
            ),
          },
        ],
      },
    },
    orders: {
      byStatus: ordersByStatus,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalOrderAmount / totalOrders : 0,
      chartData: {
        labels: Object.keys(ordersByStatus),
        datasets: [
          {
            label: "Order Count",
            data: Object.values(ordersByStatus).map((s: any) => s.count),
            backgroundColor: Object.keys(ordersByStatus).map((status) =>
              getColorByStatus(status)
            ),
          },
        ],
      },
    },
  };
}

function computeOperationsMetrics(
  processTrackingStats: any[],
  allOrders: any[]
): OperationsMetrics {
  const processByName: Record<string, Record<string, number>> = {};

  processTrackingStats.forEach((stat) => {
    const key = stat.process as string;
    if (!processByName[key]) {
      processByName[key] = {
        PENDING: 0,
        INPROGRESS: 0,
        COMPLETED: 0,
        CANCELLED: 0,
      };
    }
    processByName[key][stat.status] = stat._count;
  });

  const processes: ProcessMetrics[] = Object.entries(processByName).map(
    ([processName, counts]) => {
      const total = Object.values(counts).reduce(
        (a: number, b: number) => a + b,
        0
      );
      const completed = counts.COMPLETED || 0;
      const stuck = counts.PENDING || 0;
      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;
      const health = calculateHealthStatus(completionRate, stuck);

      return {
        process: processName,
        completionRate,
        totalItems: total,
        completedItems: completed,
        stuckItems: stuck,
        averageDuration: 0,
        healthStatus: health.status,
        healthReason: health.reason,
      };
    }
  );

  const overallHealth: "healthy" | "warning" | "critical" = processes.every(
    (p) => p.healthStatus === "healthy"
  )
    ? "healthy"
    : processes.some((p) => p.healthStatus === "critical")
      ? "critical"
      : "warning";

  const totalInProgress = allOrders.filter(
    (o: any) => o.status === "INPROGRESS"
  ).length;

  return {
    processes,
    overallHealthStatus: overallHealth,
    totalOrdersInProgress: totalInProgress,
    chartData: {
      completion: {
        labels: processes.map((p) => p.process),
        datasets: [
          {
            label: "Completion Rate (%)",
            data: processes.map((p) => p.completionRate),
            backgroundColor: "rgba(34, 197, 94, 0.8)",
            borderColor: "rgba(22, 163, 74, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      stuckItems: {
        labels: processes.map((p) => p.process),
        datasets: [
          {
            label: "Stuck Items",
            data: processes.map((p) => p.stuckItems),
            backgroundColor: "rgba(239, 68, 68, 0.8)",
          },
        ],
      },
    },
  };
}

function computeClientMetrics(
  topClientsData: any[],
  allInvoices: any[]
): {
  topClients: ClientMetric[];
  concentrationPercentage: number;
  chartData: ChartConfig;
} {
  let totalRevenue = 0;
  const clients: ClientMetric[] = topClientsData.map((client, index) => {
    const amount = client._sum.totalPrice || 0;
    totalRevenue += amount;
    const clientInvoice = allInvoices.find(
      (inv: any) => inv.clientId === client.clientId
    );

    return {
      clientId: client.clientId,
      clientName: clientInvoice?.client?.fullName || `Client ${index + 1}`,
      totalRevenue: amount,
      orderCount: client._count,
      revenuePercentage: 0,
    };
  });

  clients.forEach((client) => {
    client.revenuePercentage = calculatePercentage(
      client.totalRevenue,
      totalRevenue
    );
  });

  const top3Revenue = clients
    .slice(0, 3)
    .reduce((sum, c) => sum + c.totalRevenue, 0);
  const concentration = calculatePercentage(top3Revenue, totalRevenue);

  return {
    topClients: clients,
    concentrationPercentage: concentration,
    chartData: {
      labels: clients.map((c) => c.clientName),
      datasets: [
        {
          label: "Revenue by Client",
          data: clients.map((c) => c.totalRevenue),
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(245, 158, 11, 0.8)",
            "rgba(147, 51, 234, 0.8)",
            "rgba(239, 68, 68, 0.8)",
          ],
        },
      ],
    },
  };
}

function computeTrendMetrics(
  dailyTrendData: any[],
  startDate: Date,
  endDate: Date
): TrendMetrics {
  const trendMap: Record<string, { revenue: number; orders: number }> = {};

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    trendMap[dateStr] = { revenue: 0, orders: 0 };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dailyTrendData.forEach((trend: any) => {
    const dateStr = new Date(trend.createdAt).toISOString().split("T")[0];
    trendMap[dateStr] = {
      revenue: trend._sum.totalPrice || 0,
      orders: trend._count,
    };
  });

  const daily = Object.entries(trendMap).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    orders: data.orders,
  }));

  return {
    daily,
    chartData: {
      labels: daily.map((d) => d.date),
      datasets: [
        {
          label: "Daily Revenue",
          data: daily.map((d) => d.revenue),
          borderColor: "rgba(34, 197, 94, 1)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Daily Orders",
          data: daily.map((d) => d.orders),
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
  };
}

function extractKeyInsights(
  business: BusinessMetrics,
  operations: OperationsMetrics,
  clients: any
): Insight[] {
  const insights: Insight[] = [];

  if (clients.concentrationPercentage > 60) {
    insights.push({
      title: "High Revenue Concentration",
      description:
        "More than 60% of revenue comes from top 3 clients. Consider diversifying.",
      severity: "warning",
      metricValue: clients.concentrationPercentage,
      metricUnit: "percent",
    });
  }

  const pendingAmount = business.invoices.byStatus.PENDING?.amount || 0;
  if (pendingAmount > 0) {
    insights.push({
      title: "Outstanding Invoices",
      description: `${pendingAmount} dollars in pending invoices. Follow up with clients.`,
      severity: "info",
      metricValue: pendingAmount,
      metricUnit: ANALYTICS_CURRENCY,
    });
  }

  const criticalProcesses = operations.processes.filter(
    (p) => p.healthStatus === "critical"
  );
  if (criticalProcesses.length > 0) {
    insights.push({
      title: "Process Bottlenecks",
      description: `${criticalProcesses.map((p) => p.process).join(", ")} below 60% completion.`,
      severity: "critical",
      metricValue: criticalProcesses.length,
      metricUnit: "processes",
    });
  }

  const totalStuck = operations.processes.reduce(
    (sum, p) => sum + p.stuckItems,
    0
  );
  if (totalStuck > 5) {
    insights.push({
      title: "Stuck Orders",
      description: `${totalStuck} orders stuck in production. Investigate delays.`,
      severity: "warning",
      metricValue: totalStuck,
      metricUnit: "orders",
    });
  }

  return insights;
}

export { extractKeyInsights };
