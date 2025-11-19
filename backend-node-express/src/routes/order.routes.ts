// TODO: Order Management Routes
// Purpose: Handle order CRUD operations
// Usage: Mount at /api/orders in app.ts
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


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         options:
 *           type: array
 *           items:
 *             type: object
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *         invoiceId:
 *           type: integer
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalPrice:
 *                 type: number
 *             required:
 *               - options
 *               - totalPrice
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *
 *   get:
 *     summary: Get all orders (paginated for admins, user-specific for clients)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       400:
 *         description: Bad request or unauthorized
 *
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request or order not found
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update an order (status, options, totalPrice)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


// create new Order
router.post("/", verifyAccessToken, createOrder);
// get all orders
router.get("/", verifyAccessToken, getAllOrders);
// get user order
router.get("/:orderId", verifyAccessToken, getUserOrder);
// update user order
router.patch("/:orderId/status", verifyAccessToken, updateUserOrder);
// // delete user order
router.patch("/:orderId", verifyAccessToken, updateUserOrder);
// delete user order
router.delete("/:orderId", verifyAccessToken, deleteUserOrder);

export default router;
