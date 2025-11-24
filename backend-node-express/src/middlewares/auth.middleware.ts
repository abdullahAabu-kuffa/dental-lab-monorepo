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
interface DecodedToken {
  id: number;
  email: string;
  role?: string;
}
export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessTokenCookie = req.cookies.accessToken;
    if (!accessTokenCookie) {
      return res.status(401).json(errorResponse("Unauthorized", 401));
    }
    const token = accessTokenCookie;
    const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Attach decoded user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "CLIENT",
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
