// TODO: Order Management Routes
// Purpose: Handle order CRUD operations
// Usage: Mount at /api/v1/orders in app.ts
// Responsibility: Define POST /, GET /, GET /:id, PUT /:id, DELETE /:id endpoints
import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import {
  createOrder,
  deleteUserOrder,
  getAllOrders,
  getUserOrder,
  updateUserOrder,
} from "../controllers/order.controller";

const router = Router();
// create new Order
router.post("/", verifyAccessToken, createOrder);
// get all orders
router.get("/", verifyAccessToken, getAllOrders);
// get user order
router.get("/:orderId", verifyAccessToken, getUserOrder);
// update user order
router.put("/:orderId", verifyAccessToken, updateUserOrder);
// delete user order
router.delete("/:orderId", verifyAccessToken, deleteUserOrder);

export default router;
