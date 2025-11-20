import Jwt  from "jsonwebtoken";
import logger from "./logger.util";
interface TokenPayload {
  id: number;
  email: string;
}
// logger.info("jwt secret",process.env.JWT_SECRET);
export const generateAccessToken = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn:"2h"})
}
export const generateRefreshToken  = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}