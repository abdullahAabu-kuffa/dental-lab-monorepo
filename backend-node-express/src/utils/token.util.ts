import Jwt  from "jsonwebtoken";
interface TokenPayload {
  id: string;
  email: string;
}
export const generateAccessToken = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn:"15m"})
}
export const generateRefreshToken  = (payload:TokenPayload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}