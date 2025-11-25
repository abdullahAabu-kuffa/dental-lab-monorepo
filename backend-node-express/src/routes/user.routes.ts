// user.routes.ts
// Purpose: Handle user management routes
// Usage: Mount at /api/users in app.ts

import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
import {
  getAllUsers,
  createNewUser,
  changeUserStatus,
  deleteUser,
  getUserData,
  updateUserProfile,
} from "../controllers/user.controller";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [CLIENT, ADMIN, OWNER]
 *         isVerified:
 *           type: boolean
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         invoices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Invoice'
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         total:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         total:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: List of users with pagination info
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
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current authenticated user with full profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile with orders & invoices
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
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
 *             required: [email, password, role]
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
 *         description: User status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserProfileInput:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: User full name
 *           nullable: true
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *           nullable: true
 *         clinicName:
 *           type: string
 *           description: Clinic name
 *           nullable: true
 *         clinicAddress:
 *           type: string
 *           description: Clinic address
 *           nullable: true
 *       example:
 *         fullName: "Mohamed Roshdy"
 *         phoneNumber: "+201032057556"
 *         clinicName: "Avante Dental Lab"
 *         clinicAddress: "Giza, Egypt"
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         clinicName:
 *           type: string
 *         clinicAddress:
 *           type: string
 *         role:
 *           type: string
 *         isActive:
 *           type: boolean
 *         isVerified:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfileInput'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request, no fields to update or invalid input
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 */

// get all user
router.get("/", verifyAccessToken, getAllUsers);
// get user data
router.get("/me", verifyAccessToken, getUserData);
// create User
router.post("/", verifyAccessToken, requireAdmin, createNewUser);
// update status
router.put("/:id/status", verifyAccessToken, changeUserStatus);
// delete user
router.delete("/:id", verifyAccessToken, deleteUser);
router.patch("/:id", verifyAccessToken, updateUserProfile);

export default router;
