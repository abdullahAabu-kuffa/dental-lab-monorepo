import { Request, Response, NextFunction } from "express"; import { prisma } from "../lib/prisma"; import { errorResponse } from "../utils/response.util";

export const requireAdmin = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  if (!req.user || (req.user.role !== "ADMIN" )) {
    return res.status(403).json(errorResponse("Admin access required", 403));
  }
  next();
};
