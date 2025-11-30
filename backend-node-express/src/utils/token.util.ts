import Jwt  from "jsonwebtoken";
import { Role } from "@prisma/client";

interface AccessTokenPayload {
  fullName: string;
  id: number;
  email: string;
  role: Role;
  isVerified: boolean;
  isActive: boolean;
}
interface RefreshTokenPayload {
    id: number;
  email: string;
  role: Role;
}
// logger.info("jwt secret",process.env.JWT_SECRET);
export const generateAccessToken = (payload:AccessTokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn:"15m"})
}
export const generateRefreshToken  = (payload:RefreshTokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}