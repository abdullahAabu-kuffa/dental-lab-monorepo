// TODO: Authentication Routes
// Purpose: Handle user registration, login, logout, token refresh
// Usage: Mount at /api/auth in app.ts
// Responsibility: Define POST /register, /login, /logout, /refresh endpoints
import { Router } from "express";
import { register, login, refreshToken, logout } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/user.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *               - clinicName
 *               - clinicAddress
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               phoneNumber:
 *                 type: string
 *               clinicName:
 *                 type: string
 *               clinicAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful (awaiting admin approval)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request / Email already registered
 *       500:
 *         description: Internal server error
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJI...
 *             description: HttpOnly refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials or unverified account
 *       403:
 *         description: Account disabled
 *       500:
 *         description: Internal server error
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/refreshToken:
 *   post:
 *     summary: Refresh access token using HttpOnly refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJI...
 *             description: New HttpOnly refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       403:
 *         description: Invalid, tampered, expired, or missing refresh token
 *       500:
 *         description: Internal server error
 */
router.post("/refreshToken", refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=; Max-Age=0
 *             description: Clears the refresh token cookie
 *       401:
 *         description: User not logged in / no refresh token
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logout);

export default router;