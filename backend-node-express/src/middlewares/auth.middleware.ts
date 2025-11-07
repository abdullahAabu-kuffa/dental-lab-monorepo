// TODO: JWT Authentication Middleware
// Purpose: Verify JWT tokens and attach user to request
// Usage: Use on protected routes to verify authentication
// Responsibility: Extract token, verify signature, attach decoded user to req
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.util";
import logger from "../utils/logger.util";

/**
 * Middleware to verify JWT access token and attach user to request
 */
export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and has Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Missing Authorization header");
      return res
        .status(401)
        .json(errorResponse("Missing or invalid Authorization header", 401));
    }

    // Extract token and verify
    const token = authHeader.substring(7);
    const decoded = Jwt.verify(token, process.env.JWT_SECRET!);

    // Attach decoded user data to request
    req.user = {
      id: parseInt((decoded as any).id),
      email: (decoded as any).email,
      role: (decoded as any).role || "CLIENT",
    };

    logger.info(`Token verified for user: ${req.user.email}`);
    next();
  } catch (error: any) {
    logger.error(`Token verification failed: ${error.message}`);

    let message = "Invalid or expired token";
    if (error.name === "TokenExpiredError") {
      message = "Token has expired";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token signature";
    }

    return res.status(401).json(errorResponse(message, 401));
  }
}
