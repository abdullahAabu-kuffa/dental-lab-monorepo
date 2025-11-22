import Jwt  from "jsonwebtoken";
import logger from "./logger.util";
import { Role } from "../../generated/prisma/enums";

interface TokenPayload {
  id: number;
  email: string;
  role: Role;
}
// logger.info("jwt secret",process.env.JWT_SECRET);
export const generateAccessToken = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn:"1d"})
}
export const generateRefreshToken  = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}