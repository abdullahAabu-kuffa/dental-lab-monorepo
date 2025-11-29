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
 * /auth/login:
 *   post:
 *     summary: User Login (Web & Mobile)
 *     tags: [Auth]
 *     description: |
 *       Authenticate user with email and password.
 *       
 *       **Token Delivery (based on clientType):**
 *       - **Web** (clientType: 'web'): Tokens sent as httpOnly cookies
 *         - Response: 201 with empty data
 *         - Cookies: accessToken, refreshToken
 *       - **Mobile** (clientType: 'mobile'): Tokens in response body
 *         - Response: 201 with accessToken and refreshToken
 *         - No cookies set
 *       
 *       **Device Binding:**
 *       - User-Agent header is captured and stored in session
 *       - Subsequent requests must use same User-Agent
 *       - Token is bound to clientType (web ≠ mobile)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - clientType
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmed@clinic.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test1234
 *               clientType:
 *                 type: string
 *                 enum: [web, mobile]
 *                 example: web
 *                 description: Client type determines token delivery method
 *           examples:
 *             web:
 *               summary: Web Client Login
 *               value:
 *                 email: ahmed@clinic.com
 *                 password: Test1234
 *                 clientType: web
 *             mobile:
 *               summary: Mobile Client Login
 *               value:
 *                 email: ahmed@clinic.com
 *                 password: Test1234
 *                 clientType: mobile
 *     responses:
 *       201:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGciOiJI...; HttpOnly; Secure; SameSite=Strict
 *             description: Web clients only - httpOnly cookies for tokens
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
 *               oneOf:
 *                 - type: object
 *                   description: Web client response (tokens in cookies)
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Login successful
 *                     data:
 *                       type: 'null'
 *                 - type: object
 *                   description: Mobile client response (tokens in body)
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Login successful
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             email:
 *                               type: string
 *                               example: ahmed@clinic.com
 *                             name:
 *                               type: string
 *                               example: Ahmed Hassan
 *                         accessToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                           description: JWT access token (15 min expiry)
 *                         refreshToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                           description: JWT refresh token (7 days expiry)
 *       400:
 *         description: Bad request / Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Invalid credentials, email not verified, or account inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       403:
 *         description: Account inactive or email not verified
 *       429:
 *         description: Too many login attempts (rate limited)
 *         headers:
 *           Retry-After:
 *             schema:
 *               type: integer
 *               example: 900
 *             description: Seconds to wait before retrying
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
 *       500:
 *         description: Internal server error
 */
router.post("/login",throttleLogin, validate(loginSchema), login);

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh Access Token (Web & Mobile)
 *     tags: [Auth]
 *     description: |
 *       Refresh expired access token using refresh token.
 *       
 *       **Token Handling (based on how token is sent):**
 *       - **Web Client**: 
 *         - Sends: Refresh token in httpOnly cookie (automatically sent by browser)
 *         - Receives: New tokens in httpOnly cookies
 *       - **Mobile Client**:
 *         - Sends: Refresh token in Authorization header (Bearer token)
 *         - Receives: New tokens in response body
 *       
 *       **Device Binding:**
 *       - clientType of session must match how token is sent
 *       - User-Agent must match original login
 *       - Request will fail if device changed (clientType mismatch)
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGciOiJI...; HttpOnly; Secure; SameSite=Strict
 *             description: Web clients only - New httpOnly cookies with refreshed tokens
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Web client response (tokens in cookies)
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Token refreshed successfully
 *                     data:
 *                       type: 'null'
 *                 - type: object
 *                   description: Mobile client response (tokens in body)
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Token refreshed successfully
 *                     data:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                           description: New JWT access token (15 min expiry)
 *                         refreshToken:
 *                           type: string
 *                           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                           description: New JWT refresh token (7 days expiry)
 *       401:
 *         description: Unauthorized - Invalid/expired refresh token or clientType mismatch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid device type
 *       403:
 *         description: Forbidden - Refresh token expired, tampered, or session not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refresh token expired
 *       500:
 *         description: Internal server error
 */
router.post("/refreshToken", refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User Logout (Web & Mobile)
 *     tags: [Auth]
 *     description: |
 *       Logout user and invalidate session.
 *       
 *       **Token Handling:**
 *       - **Web Client**: 
 *         - Sends: Refresh token in httpOnly cookie (automatically sent)
 *         - Action: Clears cookies and removes session from database
 *       - **Mobile Client**:
 *         - Sends: Refresh token in Authorization header (Bearer token)
 *         - Action: Removes session from database
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=; Max-Age=0; HttpOnly; Secure; SameSite=Strict
 *             description: Web clients only - Clears all authentication cookies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       401:
 *         description: Unauthorized - User not logged in or no refresh token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not logged in
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logout);

router.post('/forgot-password' , forgotPassword)
router.post('/reset-password' , resetPassword)

export default router;