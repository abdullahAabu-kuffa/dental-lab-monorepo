
import { transports } from "winston";
// TODO: Authentication Service
// Purpose: Handle authentication business logic (decoupled from Express)
// Usage: Called by auth controller
// Responsibility: User registration, login verification, JWT generation, token refresh

import { bcryptPassword, verifyPassword } from "../utils/encryption.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger.util";
import jwt from "jsonwebtoken";
import { logout } from "../controllers/auth.controller";
import nodemailer from "nodemailer";
import { error } from "console";
import { sendStyledEmail } from "../utils/email";

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  clinicName: string;
  clinicAddress: string;
}
interface RefreshTokenResult {
  newAccessToken: string;
  newRefreshToken: string;
}

export const registerUser = async (input: RegisterInput) => {
  const { fullName, email, password, phoneNumber, clinicName, clinicAddress } =
    input;

  try {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`Registration attempted with existing email: ${email}`);
      throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcryptPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        clinicName,
        clinicAddress,
        isVerified: true, // temporary till we implement email verification
        isActive: false,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        clinicName: true,
        clinicAddress: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
      },
    });

    logger.info(`New user registered: ${email} (awaiting admin approval)`);
    return user;
  } catch (error: any) {
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    if (!user.isVerified) {
      throw new Error("Please check your email to verify your account.");
    }

    const allSessions = await prisma.session.findMany({
      where: { userId: user.id },
    });
    if (allSessions.length > 2) {
      const sessionsToDelete = [...allSessions]
        .sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime())
        .slice(0, allSessions.length - 2);

      await prisma.session.deleteMany({
        where: { id: { in: sessionsToDelete.map((s) => s.id) } },
      });
    }

    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      id: user.id,
      accessToken,
      refreshToken,
      email: user.email,
      name: user.fullName,
      session,
    };
  } catch (error: any) {
    logger.error(`[Login Error]: ${error.message}`);
    throw error;
  }
};

export const refreshTokenService = async (
  tokenFromCookie: string
): Promise<RefreshTokenResult> => {
  try {
    if (!tokenFromCookie) throw new Error("No Refresh Token");

    let payload: any;
    try {
      payload = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new Error("Invalid or tampered refresh token");
    }
    const session = await prisma.session.findUnique({
      where: { refreshToken: tokenFromCookie },
    });

    if (!session) throw new Error("Invalid refresh token");

    if (new Date() > session.expiresAt) {
      await prisma.session.delete({ where: { id: session.id } });
      throw new Error("Refresh token expired");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user?.isVerified)
      throw new Error("Please verify your email before login.");
    const allSessions = await prisma.session.findMany({
      where: { userId: user.id },
    });

    if (allSessions.length > 3) {
      const sessionsToDelete = [...allSessions]
        .sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime())
        .slice(0, allSessions.length - 3);

      await prisma.session.deleteMany({
        where: { id: { in: sessionsToDelete.map((s) => s.id) } },
      });
    }
    // if (!user || !user.isActive) {
    //   await prisma.session.delete({ where: { id: session.id } });
    //   throw new Error("Account disabled or deleted");
    // }
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { newAccessToken, newRefreshToken };
  } catch (error: any) {
    logger.error(`[Refresh Token Error]: ${error.message}`);
    throw error;
  }
};

// forgotPassword service

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const token = generateAccessToken({ id: user.id, email: user.email });
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const htmlTemplate = `
  <div style="margin:0; padding:0; background:linear-gradient(135deg,#f6f9fc 0%,#eef1f5 100%); font-family:'Segoe UI', Roboto, Arial, sans-serif;">
    <div style="max-width:600px; margin:40px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg,#CFC0AE,#BDB0A7); padding:30px 20px; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:26px;">Dental Lab</h1>
        <p style="color:#e0f7ff; font-size:14px; margin-top:8px;">Secure Password Reset</p>
      </div>

      <!-- Body -->
      <div style="padding:40px 30px; color:#333;">
        <p style="font-size:16px;">Hello <strong>${user.fullName || "User"}</strong>,</p>
        <p style="font-size:15px; line-height:1.6; color:#555;">
          We received a request to reset your password. To proceed, please click the button below.  
          This link will expire in <strong>15 minutes</strong> for security reasons.
        </p>

        <div style="text-align:center; margin:40px 0;">
          <a href="${resetLink}" 
             style="background:#BDB0A7; color:white; padding:14px 32px; font-size:16px; border-radius:8px; text-decoration:none; font-weight:600; transition:all 0.3s ease; display:inline-block;">
            Reset My Password
          </a>
        </div>

        <p style="font-size:14px; color:#777;">
          If you didn’t request this, please ignore this email or contact our support if you have concerns.
        </p>

        <hr style="border:none; border-top:1px solid #eee; margin:40px 0 20px;">
        <p style="font-size:13px; color:#aaa; text-align:center; line-height:1.5;">
          Need help? <a href="mailto:support@dentallab.com" style="color:#BDB0A7; text-decoration:none;">Contact support</a><br>
          This is an automated message, please do not reply.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f1f5f9; text-align:center; padding:15px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3094/3094855.png" alt="Dental Lab Logo" width="40" style="opacity:0.8; margin-bottom:6px;">
        <p style="font-size:12px; color:#777; margin:0;">&copy; ${new Date().getFullYear()} Dental Lab. All rights reserved.</p>
      </div>
    </div>
  </div>
      `;
    const result = await sendStyledEmail(
      user.email,
      "Reset your password",
      htmlTemplate
    );
    const secToken = await prisma.security_Token.create({
      data: {
        userId: user.id,
        isUsed: false,
        token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { emailSent: result, tokenId: secToken.id };
  } catch (error: any) {
    logger.error(`[forgot Password Service  Error]: ${error.message}`);
    throw error;
  }
};

export const resetPasswordService = async (token: string, newPassword: string) => {
  try {
    const tokenExist = await prisma.security_Token.findUnique({
      where: { token: token },
    });
    if (tokenExist!.expiresAt < new Date()) {
      throw new Error("Token expired");
    }
    const hashedPassword = await bcryptPassword(newPassword);
    if (!tokenExist) {
      throw new Error("Invalid Token");
    }
    if (tokenExist) {
      await prisma.user.update({ where: { id: tokenExist!.userId } ,data:{password:hashedPassword, updatedAt:new Date()}});
      await prisma.security_Token.deleteMany({where:{userId:tokenExist!.userId}})
    }

  } catch (error: any) {
    logger.error(`[forgot Password Service  Error]: ${error.message}`);
    throw error;
  }
};
