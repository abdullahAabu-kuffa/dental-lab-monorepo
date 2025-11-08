// TODO: Authentication Routes
// Purpose: Handle user registration, login, logout, token refresh
// Usage: Mount at /api/v1/auth in app.ts
// Responsibility: Define POST /register, /login, /logout, /refresh endpoints

import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validators/user.validator";
const router = Router();


/**
 * POST api/auth/register
 * Register a new user
 * Body: { fullName, email, password, phone, clinicName, clinicAddress }
 */
router.post('/register', validate(registerSchema), register);

/**
 * POST api/auth/login
 * Login a user
 * Body: { email, password }
 */
router.post('/login', validate(loginSchema), login)
/**
 * POST /api/auth/refreshToken
 * @desc Refresh user's access token using refresh token in cookies
 * @access Public
 */
router.post('/refreshToken', refreshToken);

export default router