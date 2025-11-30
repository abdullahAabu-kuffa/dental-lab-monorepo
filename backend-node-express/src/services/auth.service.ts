// TODO: Authentication Service
// Purpose: Handle authentication business logic (decoupled from Express)
// Usage: Called by auth controller
// Responsibility: User registration, login verification, JWT generation, token refresh

import { bcryptPassword, verifyPassword } from "../utils/encryption.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger.util";
import jwt from "jsonwebtoken";
import { sendStyledEmail } from "../utils/email";
import { buildEmailTemplate } from "../utils/emailTemplate";
import { createAdminNotification } from "./notification.service";
import { Request } from "express";

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
        isActive: true,
        createdAt: true,
      },
    });
    // Send admin notification
    try {
      await createAdminNotification({
        type: "APPROVAL_PENDING",
        title: "New Account Awaiting Approval",
        message: `New account "${user.fullName}" from ${user.clinicName} requires activation approval`,
        data: {
          userId: user.id,
          email: user.email,
          clinicName: user.clinicName,
          fullName: user.fullName,
        },
        notifyUser: false,
        userNotificationType: "WELCOME", // User gets WELCOME notification
        triggeredByUserId: user.id,
        sendAdminEmail: false, // Send email to admins
      });

      logger.info(
        `[Auth Service] Admin notification created for user ${user.id}`
      );
    } catch (notificationError: any) {
      logger.error(
        `[Auth Service] Failed to send admin notification for user ${user.id}:`,
        notificationError
      );
      // Don't throw - user registration shouldn't fail if notification fails
    }

    const htmlTemplate = buildEmailTemplate({
      title: "Registration Successful",
      body: `
      <p style="font-size:16px;">Hello <strong>${fullName}</strong>,</p>
      <p style="font-size:15px; line-height:1.6; color:#555;">
        Thank you for registering with <strong>Avante Dental Solutions</strong>!
        Your account is now created and is pending admin approval.
      </p>
      <div style="background:#e7f3ff; border-left:4px solid #BDB0A7; padding:20px; margin:25px 0; border-radius:6px;">
        <p style="margin:0 0 12px 0; font-size:15px; color:#333;"><strong>Registration Details:</strong></p>
        <p style="margin:8px 0; font-size:14px; color:#555;">Email: <strong>${email}</strong></p>
        <p style="margin:8px 0; font-size:14px; color:#555;">Clinic: <strong>${clinicName}</strong></p>
      </div>
      <div style="background:#fffbea; border-left:4px solid #ffc107; padding:20px; margin:25px 0; border-radius:6px;">
        <p style="margin:0 0 12px 0; font-size:15px; color:#333;"><strong>Next Steps:</strong></p>
        <p style="font-size:14px; line-height:1.6; color:#555; margin:8px 0;">
          Our team will review your registration and activate your account soon.<br>
          You will receive a notification when your account is active.
        </p>
      </div>
      <p style="font-size:14px; color:#777;">
        For questions, please contact our support team.
      </p>
    `,
      showButton: false,
    });
    await sendStyledEmail(
      email,
      "Welcome to Avante Dental Solutions - Registration Received",
      htmlTemplate
    );

    logger.info(`New user registered: ${email} (awaiting admin approval)`);

    return user;
  } catch (error: any) {
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string,
  userAgent: string,
  clientType: string
) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid cradintails");
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid cradintails");
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

    const accessToken = generateAccessToken({
      fullName: user.fullName || "",
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    // ✅ Get userAgent from request
    logger.info(
      `Login attempt from ${userAgent} with clientType: ${clientType}`
    );

    // ✅ Store clientType and userAgent in session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        clientType,
        userAgent,
      },
    });

    return {
      id: user.id,
      accessToken,
      refreshToken,
      email: user.email,
      name: user.fullName,
      role: user.role,
      session,
    };
  } catch (error: any) {
    logger.error(`[Login Error]: ${error.message}`);
    throw error;
  }
};

export const refreshTokenService = async (
  refreshToken: string,
  clientType: "web" | "mobile", // ✅ Add this parameter
  userAgent: string // ✅ Add this parameter
): Promise<RefreshTokenResult> => {
  try {
    if (!refreshToken) throw new Error("No Refresh Token");

    let payload: any;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new Error("Invalid or tampered refresh token");
    }
    const session = await prisma.session.findUnique({
      where: { refreshToken: refreshToken },
    });

    if (!session) throw new Error("Invalid refresh token");
    //  NEW: Verify clientType matches
    if (session.clientType !== clientType) {
      logger.warn(
        `[SECURITY] ClientType mismatch: session=${session.clientType}, request=${clientType}`
      );
      throw new Error("Invalid device type");
    }

    //  NEW: Verify userAgent hasn't changed
    if (session.userAgent !== userAgent) {
      logger.warn(
        `[SECURITY] UserAgent mismatch: stored=${session.userAgent}, current=${userAgent}`
      );
      // Just log for now, allow the request
    }

    if (new Date() > session.expiresAt) {
      await prisma.session.delete({ where: { id: session.id } });
      throw new Error("Refresh token expired");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      await prisma.session.delete({ where: { id: session.id } });
      throw new Error("User not found");
    }
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
      fullName: user.fullName || "",
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
    });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
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
  logger.info(`[Forgot Password Service] Email: ${email}`);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const token = generateAccessToken({
      fullName: user.fullName || "",
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
    });
    logger.info(`[Forgot Password Service] Token: ${token}`);
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const htmlTemplate = buildEmailTemplate({
      title: "Secure Password Reset",
      body: `
        <p style="font-size:16px;">Hello <strong>${user.fullName || "User"}</strong>,</p>
        <p style="font-size:15px; line-height:1.6; color:#555;">
          We received a request to reset your password. To proceed, please click the button below.  
          This link will expire in <strong>15 minutes</strong> for security reasons.
        </p>
        <p style="font-size:14px; color:#777;">
          If you didn’t request this, please ignore this email or contact our support if you have concerns.
        </p>
      `,
      ctaText: "Reset My Password",
      ctaUrl: resetLink,
      showButton: true,
    });
    await sendStyledEmail(
      email,
      "Welcome to Avante Dental Solutions - Registration Received",
      htmlTemplate
    );
    const secToken = await prisma.security_Token.create({
      data: {
        userId: user.id,
        isUsed: false,
        token: token,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return { emailSent: true, tokenId: secToken.id };
  } catch (error: any) {
    logger.error(`[forgot Password Service  Error]: ${error.message}`);
    throw error;
  }
};

export const resetPasswordService = async (
  token: string,
  newPassword: string
) => {
  try {
    const tokenExist = await prisma.security_Token.findUnique({
      where: { token: token },
    });
    if (!tokenExist) throw new Error("Invalid Token");
    if (tokenExist.expiresAt < new Date()) throw new Error("Token expired");

    const hashedPassword = await bcryptPassword(newPassword);
    if (!tokenExist) {
      throw new Error("Invalid Token");
    }
    if (tokenExist) {
      await prisma.user.update({
        where: { id: tokenExist!.userId },
        data: { password: hashedPassword, updatedAt: new Date() },
      });
      await prisma.security_Token.deleteMany({
        where: { userId: tokenExist!.userId },
      });
    }
  } catch (error: any) {
    logger.error(`[forgot Password Service  Error]: ${error.message}`);
    throw error;
  }
};
