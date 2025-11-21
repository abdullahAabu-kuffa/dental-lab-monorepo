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
      },
    });
    return newOrder;
  } catch (error: any) {
    logger.error(`[createOrderServices error] : ${error.message}`);
    throw error;
  }
};
export const getAllOrdersServices = async (userId: any, req: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    let orders;
    let totalOrders;
    parseId(userId);
    const user =await checkUser(userId)
    if (user.role === "CLIENT") {
      totalOrders = await prisma.order.count({ where: { userId } });
      orders = await prisma.order.findMany({ where: { userId } });
    } else if (user.role === "ADMIN" || user.role === "OWNER") {
      totalOrders = await prisma.order.count();
      orders = await prisma.order.findMany({
        include: { user: true, invoice: true, file: true },
        skip: (page - 1) * limit,
        take: limit,
      });
    } else {
      throw new Error("No Role Provided");
    }

    if (orders?.length === 0) {
      throw new Error("no orders Found");
    }
    let totalPages = Math.ceil(totalOrders / limit);
    return { orders, page, limit,totalOrders, totalPages };
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
    if (req.user.role === "CLIENT" && order?.userId !== userId) {
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
    if (user.role  === "CLIENT" && order?.userId !== userId) {
        throw new Error("You are not allowed to Delete this order");
    }
    const deletedOrder  = await prisma.order.delete({where:{id:orderId}})
    return deletedOrder;
  } catch (error: any) {
    logger.error(`[deleteUserOrderServices error] : ${error.message}`);
    throw error;
  }
};
