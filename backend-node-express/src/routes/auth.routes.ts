// TODO: Authentication Routes
// Purpose: Handle user registration, login, logout, token refresh
// Usage: Mount at /api/auth in app.ts
// Responsibility: Define POST /register, /login, /logout, /refresh endpoints
import { Router } from "express";
import { register, login, refreshToken, logout, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/user.validator";
import { throttleLogin } from "../middlewares/rate-limit.middleware";

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
 *                 example: ahmed@clinic.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test1234
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJI...; HttpOnly; Secure; SameSite=Strict
 *             description: HttpOnly refresh token cookie
 *           X-RateLimit-Limit:
 *             schema:
 *               type: integer
 *               example: 5
 *             description: Maximum number of login attempts allowed
 *           X-RateLimit-Remaining:
 *             schema:
 *               type: integer
 *               example: 4
 *             description: Number of login attempts remaining
 *           X-RateLimit-Reset:
 *             schema:
 *               type: string
 *               format: date-time
 *             description: Time when rate limit will reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials, email not verified, or account inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *       403:
 *         description: Account inactive
 *       429:
 *         description: Too many login attempts
 *         headers:
 *           Retry-After:
 *             schema:
 *               type: integer
 *               example: 900
 *             description: Number of seconds to wait before retrying
 *           X-RateLimit-Limit:
 *             schema:
 *               type: integer
 *               example: 5
 *           X-RateLimit-Remaining:
 *             schema:
 *               type: integer
 *               example: 0
 *           X-RateLimit-Reset:
 *             schema:
 *               type: string
 *               format: date-time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Too many failed login attempts. Please try again in 15 minutes.
 *                 statusCode:
 *                   type: integer
 *                   example: 429
 *       500:
 *         description: Internal server error
 */
router.post("/login",throttleLogin, validate(loginSchema), login);

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

router.post('/forgot-password' , forgotPassword)
router.get('/reset-password' , resetPassword)

export default router;