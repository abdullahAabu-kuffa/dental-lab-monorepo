// TODO: JWT Authentication Middleware
// Purpose: Verify JWT tokens and attach user to request
// Usage: Use on protected routes to verify authentication
// Responsibility: Extract token, verify signature, attach decoded user to req
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.util";
import logger from "../utils/logger.util";
import { prisma } from "../lib/prisma";
import { Session } from "@prisma/client";

/**
 * Middleware to verify JWT access token and attach user to request
 */
interface DecodedToken {
  id: number;
  email: string;
  role?: string;
}
export async function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userAgent = req.headers["user-agent"] || "unknown";

    let token: string;
    let clientType: "web" | "mobile";

    const hasCookies = !!req.cookies.accessToken;
    const hasBearer = req.headers.authorization?.startsWith("Bearer ");
    // logger.info(
    //   `Verify access token middleware called for ${JSON.stringify(req.body)} , cookies=${hasCookies}, bearer=${hasBearer} , userAgent=${userAgent}`
    // );

    if (hasCookies && !hasBearer) {
      // WEB
      token = req.cookies.accessToken;
      clientType = "web";
    } else if (!hasCookies && hasBearer) {
      // MOBILE
      token = req.headers.authorization!.substring(7);
      clientType = "mobile";
    } else {
      // Invalid request
      return res.status(401).json(errorResponse("Unauthorized", 401));
    }

    // const accessTokenCookie = req.cookies.accessToken;
    // if (!accessTokenCookie) {
    //   return res.status(401).json(errorResponse("Unauthorized", 401));
    // }
    // const token = accessTokenCookie;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // ✅ NEW: Find session and verify clientType + userAgent
    const sessions:Session[] = await prisma.session.findMany({
      where: { userId: decoded.id },
      orderBy: { createdAt: "desc" },
    });

    if (!sessions) {
      return res.status(401).json(errorResponse("Session not found", 401));
    }

    //  NEW: Verify clientType matches
    // logger.info(
    //   `Sessions for ${decoded.email}: ${session.map((s) => s.clientType)}`
    // );
    // logger.info(`Request clientType: ${clientType}`);
    // logger.info(
    //   "some answer: ",
    //   session.some((s) => s.clientType == clientType) === true
    // );
    if (!sessions.some((s) => s.clientType === clientType)) {
      // logger.warn(
      //   `[SECURITY] ClientType mismatch: sessions=${session.map((s) => s.clientType)}, request=${clientType}`
      // );
      return res.status(401).json(errorResponse("Invalid device type", 401));
    }

    if (!sessions.some((s) => s.userAgent === userAgent)) {
      // logger.warn(
      //   `[SECURITY] UserAgent mismatch for ${decoded.email}: stored agents=${session.map((s) => s.userAgent)}, current=${userAgent}`
      // );
      return res.status(401).json(errorResponse("Invalid device type", 401));
    }

    // logger.info(
    //   `Session verified for ${decoded.email}: ${clientType} - ${userAgent} - with session : ${session}`
    // );

    // Attach decoded user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "CLIENT",
    };

    // logger.info(`Token verified for user: ${req.user.email}`);
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
