import logger from "../utils/logger.util";
import { prisma } from "../lib/prisma";
import { checkUser, parseId } from "../utils/helper/checkUser";
import { checkOrder } from "../utils/helper/checkOrder";
// TODO: Order Service
// Purpose: Handle order business logic
// Usage: Called by order controller
// Responsibility: Create, read, update, delete orders; order status management

export const createOrderServices = async (userId: any, orderData: any) => {
  try {
    parseId(userId);
    await checkUser(userId);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        options: orderData.options,
        totalPrice: orderData.totalPrice,
        fileId: orderData.fileId,
      },
    });
    return newOrder;
  } catch (error: any) {
    logger.error(`[createOrderServices error] : ${error.message}`);
    throw error;
  }
};
// export const getAllOrdersServices = async (userId: any, req: any) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = 10;
//     let orders;
//     let totalOrders;
//     parseId(userId);
//     const user = await checkUser(userId);
//     if (user.role === "CLIENT") {
//       totalOrders = await prisma.order.count({ where: { userId } });
//       orders = await prisma.order.findMany({ where: { userId } });
//     } else if (user.role === "ADMIN" || user.role === "OWNER") {
//       totalOrders = await prisma.order.count();
//       orders = await prisma.order.findMany({
//         include: { user: true, invoice: true, file: true },
//         skip: (page - 1) * limit,
//         take: limit,
//       });
//     } else {
//       throw new Error("No Role Provided");
//     }

//     if (orders?.length === 0) {
//       throw new Error("no orders Found");
//     }
//     let totalPages = Math.ceil(totalOrders / limit);
//     return { orders, page, limit, totalOrders, totalPages };
//   } catch (error: any) {
//     logger.error(`[getAllOrdersServices error] : ${error.message}`);
//     throw error;
//   }
// };
export const getAllOrdersServices = async (userId: any, req: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const search = (req.query.search as string)?.trim() || '';
    const filter = (req.query.filter as string)?.toLowerCase() || '';

    parseId(userId);
    const user = await checkUser(userId);

    logger.info(
      `[getAllOrdersServices] Fetching orders - page: ${page}, limit: ${limit}, search: ${search}, filter: ${filter}, userRole: ${user.role}`
    );

    let orders;
    let totalOrders;

    if (user.role === 'CLIENT') {
      // Build where clause for client orders
      const whereClause: any = { userId };

      // Status filter for clients
      if (filter && ['pending', 'in_progress', 'completed', 'cancelled'].includes(filter)) {
        whereClause.status = filter.toUpperCase();
        logger.info(`[getAllOrdersServices] Applied status filter: ${filter}`);
      }

      totalOrders = await prisma.order.count({
        where: whereClause,
      });

      orders = await prisma.order.findMany({
        where: whereClause,
        include: { user: true, invoice: true, file: true },
        orderBy: { createdAt: 'desc' },
      });
    } else if (user.role === 'ADMIN' || user.role === 'OWNER') {
      // Build where clause for admin orders
      const whereClause: any = {};

      // Search by user fullName
      if (search) {
        whereClause.user = {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        };
        logger.info(`[getAllOrdersServices] Applied search filter: ${search}`);
      }

      // Status filter for admins
      if (filter && ['pending', 'in_progress', 'completed', 'cancelled'].includes(filter)) {
        whereClause.status = filter.toUpperCase();
        logger.info(`[getAllOrdersServices] Applied status filter: ${filter}`);
      }

      totalOrders = await prisma.order.count({
        where: whereClause,
      });

      orders = await prisma.order.findMany({
        where: whereClause,
        include: { user: true, invoice: true, file: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } else {
      throw new Error('No Role Provided');
    }

    if (orders?.length === 0) {
      logger.warn(
        `[getAllOrdersServices] No orders found with filters - search: ${search}, filter: ${filter}`
      );
      // Don't throw - return empty array instead
      // throw new Error("no orders Found");
    }

    const totalPages = Math.ceil(totalOrders / limit);

    logger.info(
      `[getAllOrdersServices] Fetched ${orders.length} orders (total: ${totalOrders})`
    );

    return { orders, page, limit, totalOrders, totalPages };
  } catch (error: any) {
    logger.error(`[getAllOrdersServices error] : ${error.message}`);
    throw error;
  }
};

export const getUserOrderServices = async (req: any) => {
  try {
    const userId = parseId(req.user?.id);
    const orderId = parseId(req.params.orderId);
    await checkUser(userId);
    const order = await checkOrder(orderId);
    return order;
  } catch (error: any) {
    logger.error(`[getUserOrderServices error] : ${error.message}`);
    throw error;
  }
};

export const updateUserOrderService = async (req: any) => {
  try {
    const userId = parseId(req.user?.id);
    const orderId = parseId(req.params.orderId);
    await checkUser(userId);
    await checkOrder(orderId);
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new Error("Order not found");
    }
    if (req.user.role === "CLIENT" && order.userId !== userId) {
      throw new Error("You are not allowed to update this order");
    }

    const allowedFields = ["status", "options", "totalPrice"];
    const dataToUpdate = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );
    const UpdatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: dataToUpdate,
    });
    return UpdatedOrder;
  } catch (error: any) {
    logger.error(`[updateUserOrderService error]: ${error.message}`);
    throw error;
  }
};

export const deleteUserOrderServices = async (req: any) => {
  try {
    const userId = parseId(req.user?.id);
    const orderId = parseId(req.params.orderId);
    const user = await checkUser(userId);
    const order = await checkOrder(orderId);
    if (user.role === "CLIENT" && order?.userId !== userId) {
      throw new Error("You are not allowed to Delete this order");
    }
    const deletedOrder = await prisma.order.delete({ where: { id: orderId } });
    return deletedOrder;
  } catch (error: any) {
    logger.error(`[deleteUserOrderServices error] : ${error.message}`);
    throw error;
  }
};

export const createStepOrderServices = async (req: any) => {
  try {
    const userId = parseId(req.user?.id);
    const orderId = parseId(req.params.orderId);
    const user = await checkUser(userId);
    const order = await checkOrder(orderId);
    const lastStep = await prisma.orderTracking.findFirst({
      where: { orderId },
      orderBy: { stepOrder: "desc" },
    });
    const nextStepOrder = lastStep ? lastStep.stepOrder + 1 : 1;

    const { process, note } = req.body;

    const orderStep = await prisma.orderTracking.create({
      data: {
        orderId: orderId,
        actorId: userId,
        status: "IN_PROGRESS",
        stepOrder: nextStepOrder,
        process: process || `Step ${nextStepOrder}`,
        startDate: new Date(),
        note: note || null,
      },
    });
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "IN_PROGRESS" },
    });
    return orderStep;
  } catch (error: any) {
    logger.error(`[createStepOrderServices  error] : ${error.message}`);
    throw error;
  }
};
