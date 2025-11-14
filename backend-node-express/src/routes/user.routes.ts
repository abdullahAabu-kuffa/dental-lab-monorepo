// user.routes.ts
// Purpose: Handle user management routes
// Usage: Mount at /api/v1/users in app.ts

import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
import {
  getAllUsers,
  createNewUser,
  changeUserStatus,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with pagination
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Successfully fetched users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [CLIENT, ADMIN, OWNER]
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /users/{id}/status:
 *   put:
 *     summary: Approve or reject a user (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [approve, reject]
 *     responses:
 *       200:
 *         description: User status updated successfully
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// create new Order
router.get("/", verifyAccessToken, getAllUsers);
// get all orders
router.post("/", verifyAccessToken, requireAdmin, createNewUser);
// get user order
router.put("/:id/status", verifyAccessToken, changeUserStatus);
// update user order
router.delete("/:id", verifyAccessToken, deleteUser);

export default router;
