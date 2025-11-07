// TODO: Authentication Service
// Purpose: Handle authentication business logic (decoupled from Express)
// Usage: Called by auth controller
// Responsibility: User registration, login verification, JWT generation, token refresh

import { bcryptPassword, verifyPassword } from "../utils/encryption.util";
import { generateAccessToken } from "../utils/token.util";
import {prisma} from "../lib/prisma";
import logger from "../utils/logger.util";


interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  clinicName: string;
  clinicAddress: string;
}

export const registerUser = async (input: RegisterInput) => {
  const { fullName, email, password, phoneNumber, clinicName, clinicAddress } = input;

  try {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`Registration attempted with existing email: ${email}`);
      throw new Error('Email already registered');
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
}

export const loginUser = async (email: string, password: string) => {
  const hashedPassword = await bcryptPassword(password);
  const verfied = await verifyPassword(password, hashedPassword);
  const accessToken = generateAccessToken({ id: "2", email });
  console.log(hashedPassword, verfied, accessToken);
  return {
    accessToken: accessToken,
    refreshToken: "dummy-refresh",
    user: { email },
  };
};
