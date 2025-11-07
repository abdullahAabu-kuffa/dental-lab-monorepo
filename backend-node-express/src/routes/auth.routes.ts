// TODO: Authentication Routes
// Purpose: Handle user registration, login, logout, token refresh
// Usage: Mount at /api/v1/auth in app.ts
// Responsibility: Define POST /register, /login, /logout, /refresh endpoints

import { Router } from "express";
import { login } from "../controllers/auth.controller";
const router = Router();



router.post('/login', login)

export default router