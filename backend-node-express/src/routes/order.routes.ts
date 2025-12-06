// TODO: Order Management Routes
// Purpose: Handle order CRUD operations
// Usage: Mount at /api/orders in app.ts
// Responsibility: Define POST /, GET /, GET /:id, PUT /:id, DELETE /:id endpoints
import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import {
  completeStepOrder,
  createOrder,
  createStepOrder,
  deleteUserOrder,
  getAllOrders,
  getAllStepOrder,
  getUserOrder,
  updateInvoice,
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
 *     summary: Get all orders with pagination, search, and filters
 *     description: |
 *       For CLIENT: Returns only their own orders
 *       For ADMIN/OWNER: Returns all orders with search and filter capabilities
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (admins only)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by user fullName (case-insensitive, admins only)
 *         example: john
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed, cancelled]
 *         description: Filter by order status
 *         example: pending
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           userId:
 *                             type: integer
 *                           fileId:
 *                             type: integer
 *                             nullable: true
 *                           status:
 *                             type: string
 *                             enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *                           invoiceId:
 *                             type: integer
 *                             nullable: true
 *                           options:
 *                             type: object
 *                           totalPrice:
 *                             type: number
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               fullName:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           invoice:
 *                             type: object
 *                             nullable: true
 *                           file:
 *                             type: object
 *                             nullable: true
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalOrders:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       400:
 *         description: Bad request or no orders found
 *       401:
 *         description: Unauthorized
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
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderTracking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         orderId:
 *           type: integer
 *         actorId:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [IN_PROGRESS, COMPLETED]
 *         stepOrder:
 *           type: integer
 *         process:
 *           type: string
 *         note:
 *           type: string
 *           nullable: true
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     CreateStepInput:
 *       type: object
 *       properties:
 *         note:
 *           type: string
 *           nullable: true
 *       required: []
 *
 *     CompleteStepResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           type: string
 *         endDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders/{orderId}/track:
 *   post:
 *     summary: Create a new step for an order
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStepInput'
 *     responses:
 *       201:
 *         description: Step created successfully (IN_PROGRESS)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderTracking'
 *       400:
 *         description: Bad request (step already exists or order finished)
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all tracking steps for an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of order tracking steps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderTracking'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/orders/{orderId}/track/{trackingId}:
 *   patch:
 *     summary: Complete a specific step for an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: trackingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tracking step ID
 *     responses:
 *       200:
 *         description: Step completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompleteStepResponse'
 *       400:
 *         description: Step already completed or invalid state
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
// traking
router.post("/:orderId/track", verifyAccessToken, createStepOrder);
router.get("/:orderId/track", verifyAccessToken, getAllStepOrder);
router.patch(
  "/:orderId/track/:TrackingId",
  verifyAccessToken,
  completeStepOrder
);

router.patch("/invoice/:invoiceId", verifyAccessToken, updateInvoice);
export default router;
