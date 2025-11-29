import { Request, Response, NextFunction } from "express";

export function captureUserAgent(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith(`/api/notifications/stream`)) {
    return next();
  }
  req.userAgent = req.headers['user-agent'] || 'unknown';
  next();
}
