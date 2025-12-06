import cron from "node-cron";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
console.log("Cron job registered!");
cron.schedule("24 0 * * *", async () => {
  console.log(" Generating monthly invoices...");

  const lastMonthStart = dayjs().startOf("day").toDate();
  const lastMonthEnd = dayjs().endOf("day").toDate();

  console.log("Start:", lastMonthStart.toLocaleString());
  console.log("End:", lastMonthEnd.toLocaleString());

  const clients = await prisma.user.findMany({
    where: {
      orders: {
        some: {
          invoiceId: null,
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
        },
      },
    },
  });

  for (const client of clients) {
    const orders = await prisma.order.findMany({
      where: {
        userId: client.id,
        invoiceId: null,
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
    });

    if (orders.length === 0) continue;

    const totalPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    const invoice = await prisma.invoice.create({
      data: {
        clientId: client.id,
        totalPrice,
        dueDate: new Date(),
        isSummary: true,
      },
    });

    await prisma.order.updateMany({
      where: { id: { in: orders.map((o) => o.id) } },
      data: { invoiceId: invoice.id },
    });

    console.log(`✔ Invoice created for client ${client.id}: ${invoice.id}`);
  }

  console.log("🎉 Monthly invoices created successfully!");
}, {
  timezone: "Africa/Cairo"
});
