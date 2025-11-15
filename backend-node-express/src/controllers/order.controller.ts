// TODO: Order Controller
// Purpose: Handle order operations
// Usage: Called from order routes
// Responsibility: Implement createOrder, getOrders, getOrder, updateOrder, deleteOrder methods

import logger from "../utils/logger.util";
import { errorResponse, successResponse } from "../utils/response.util";
import { NextFunction, Request, Response } from "express";


export async function createOrder(req: Request, res: Response) {
  try {

    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {

    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function getUserOrder(req: Request, res: Response) {
  try {

    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function updateUserOrder(req: Request, res: Response) {
  try {

    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function deleteUserOrder(req: Request, res: Response) {
  try {

    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}