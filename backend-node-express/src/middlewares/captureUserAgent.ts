import { Request, Response, NextFunction } from "express";

export function captureUserAgent(req: Request, res: Response, next: NextFunction) {
  req.userAgent = req.headers['user-agent'] || 'unknown';
  next();
}
