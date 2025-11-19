import { date } from "joi";
// TODO: Order Controller
// Purpose: Handle order operations
// Usage: Called from order routes
// Responsibility: Implement createOrder, getOrders, getOrder, updateOrder, deleteOrder methods

import {
  createOrderServices,
  deleteUserOrderServices,
  getAllOrdersServices,
  getUserOrderServices,
  updateUserOrderService,
} from "../services/order.service";
import logger from "../utils/logger.util";
import { errorResponse, successResponse } from "../utils/response.util";
import { NextFunction, Request, Response } from "express";

export async function createOrder(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("Unauthorized");
    const orderData = req.body;
    const order = await createOrderServices(userId, orderData);
    return res
      .status(201)
      .json(successResponse(order, "Order created successfully"));
  } catch (error: any) {
    logger.error(`createOrder controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("Unauthorized");
    const orders = await getAllOrdersServices(userId, req);
    return res
      .status(200)
      .json(successResponse(orders, "Orders fetched successfully"));
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function getUserOrder(req: Request, res: Response) {
  try {
    const order = await getUserOrderServices(req);
    return res
      .status(200)
      .json(
        successResponse(
          order,
          "Order fetched successfully"
        )
      );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function updateUserOrder(req: Request, res: Response) {
  try {
    const updatedOrder = await updateUserOrderService(req);
    return res.status(200).json(successResponse(updatedOrder, "Order updated successfully"));
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function deleteUserOrder(req: Request, res: Response) {
  try {
    const deletedOrder = await deleteUserOrderServices(req);
    return res.status(200).json(successResponse(deletedOrder, "Order deleted successfully"));
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}
