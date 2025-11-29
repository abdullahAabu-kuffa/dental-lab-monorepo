// TODO: Rate Limiting Middleware
// Purpose: Limit number of requests per IP address
// Usage: Mount on sensitive endpoints (login, signup, payment)
// Responsibility: Track requests by IP, enforce rate limits, return 429 on limit

import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import { errorResponse } from "../utils/response.util";
import logger from "../utils/logger.util";

// Initialize Redis client with error handling
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || undefined, // Add password if set
  enableOfflineQueue: false,
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

redisClient.on("error", (err) => {
  logger.error(`Redis client error: ${err.message}`);
});

// ==================== Rate Limiters ====================

/**
 * General IP rate limiter
 * 10 requests per 15 minutes
 */
const ipLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl_ip", // Redis key prefix
  points: 10,
  duration: 60 * 15, // 15 minutes
  blockDuration: 0, // No additional block after limit
});

/**
 * Email-specific rate limiter (for password reset, verification)
 * 3 requests per 60 minutes
 */
const emailLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl_email",
  points: 3,
  duration: 60 * 60, // 1 hour
});

/**
 * Login attempt limiter (prevent brute force)
 * 5 failed attempts per 15 minutes
 */
const loginLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl_login",
  points: 5,
  duration: 60 * 3,
});

/**
 * Generic rate limiter factory
 * @param keyExtractor - Function to extract key from request
 * @param limiter - RateLimiterRedis instance
 * @param customMessage - Optional custom error message
 */
function createRateLimitMiddleware(
  keyExtractor: (req: Request) => string,
  limiter: RateLimiterRedis,
  customMessage?: string
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Rate limit check for ${JSON.stringify(req.body)}`);
    const key = keyExtractor(req);

    if (!key) {
      logger.warn("Rate limit key extractor returned empty key");
      return res.status(400).json(errorResponse("Invalid request", 400));
    }

    try {
      const rateLimiterRes = await limiter.consume(key, 1);

      // Attach rate limit info to response headers
      res.set("X-RateLimit-Limit", String(limiter.points));
      res.set(
        "X-RateLimit-Remaining",
        String(Math.max(0, rateLimiterRes.remainingPoints))
      );
      res.set(
        "X-RateLimit-Reset",
        String(new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString())
      );

      next();
    } catch (rejRes: any) {
      const retrySecs = Math.round(rejRes.msBeforeNext / 1000) || 1;

      logger.warn(`Rate limit exceeded: key=${key}, retryAfter=${retrySecs}s`);

      res.set("Retry-After", String(retrySecs));
      return res
        .status(429)
        .json(
          errorResponse(
            customMessage || "Too many requests. Please try again later.",
            429
          )
        );
    }
  };
}

// ==================== Exported Middlewares ====================

/**
 * Throttle by IP address
 * Usage: app.post('/api/endpoint', throttleByIP, handler)
 */
export const throttleByIP = createRateLimitMiddleware(
  (req) => req.ip || "unknown",
  ipLimiter,
  "Too many requests from your IP address"
);

/**
 * Throttle by email (for password reset, verification, etc.)
 * Usage: app.post('/forgot-password', throttleByEmail, handler)
 */
export const throttleByEmail = createRateLimitMiddleware(
  (req) => (req.body.email || "").toLowerCase().trim(),
  emailLimiter,
  "Too many requests for this email. Please try again in 1 hour."
);

/**
 * Throttle login attempts by username/email
 * Usage: app.post('/login', throttleLogin, handler)
 */
export const throttleLogin = createRateLimitMiddleware(
  (req) => (req.body.email || "").toLowerCase().trim(),
  loginLimiter,
  "Too many failed login attempts. Please try again in 15 minutes."
);

/**
 * Combined throttle - both IP and email
 * Usage: app.post('/forgot-password', throttleByIP, throttleByEmail, handler)
 */
export const throttleByBoth = [throttleByIP, throttleByEmail];

/**
 * Graceful shutdown
 */
export async function closeRedisConnection() {
  await redisClient.quit();
  logger.info("Redis connection closed");
}
