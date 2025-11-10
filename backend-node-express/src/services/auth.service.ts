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
