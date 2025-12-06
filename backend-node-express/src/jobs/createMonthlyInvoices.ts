import cron from "node-cron";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

console.log("Cron job registered!");

cron.schedule("* * * * *", async () => {
  console.log(" Generating invoices for current month...");

  const monthStart = dayjs().startOf("month").toDate();
  const monthEnd = dayjs().endOf("month").toDate();

  console.log("Start:", monthStart.toLocaleString());
  console.log("End:", monthEnd.toLocaleString());

  const clients = await prisma.user.findMany({
    where: {
      orders: {
        some: {
          invoiceId: null,
          createdAt: { gte: monthStart, lte: monthEnd },
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
          gte: monthStart,
          lte: monthEnd,
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

  console.log("🎉 Invoices for current month created successfully!");
}, {
  timezone: "Africa/Cairo"
});
