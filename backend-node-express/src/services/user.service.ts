// TODO: User Service
// Purpose: Handle user database operations
// Usage: Called by user controller
// Responsibility: CRUD operations for users, role management, profile updates

import { error } from "console";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger.util";
import { checkUser } from "../utils/helper/checkUser";
import { createAndPublishNotification } from "./notification.service";
import { NotificationType } from "@prisma/client";
interface UpdateUserProfileDto {
  fullName?: string;
  phoneNumber?: string;
  clinicName?: string;
  clinicAddress?: string;
}

// export const getAllUsersService = async (req: any) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 20;
//     const total = await prisma.user.count();
//     const totalPages = Math.ceil(total / limit);
//     const users = await prisma.user.findMany({
//       skip: (page - 1) * limit,
//       take: limit,
//     });
//     return { page, limit, total, totalPages, users };
//   } catch (error: any) {
//     logger.error(`[getAllUsersService Error]: ${error.message}`);
//     throw error;
//   }
// };

export const getAllUsersService = async (req: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string)?.trim() || "";
    const filter = (req.query.filter as string)?.toLowerCase() || "";

    logger.info(
      `[getAllUsersService] Fetching users - page: ${page}, limit: ${limit}, search: ${search}, filter: ${filter}`
    );

    // Build where clause for filtering
    const whereClause: any = {};

    // Search filter: by name or email
    if (search) {
      whereClause.OR = [
        {
          fullName: {
            contains: search,
            mode: "insensitive", // Case-insensitive search
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
      logger.info(`[getAllUsersService] Applied search filter: ${search}`);
    }

    // Status filter: pending or approved
    if (filter === "pending") {
      whereClause.isActive = false;
      logger.info(
        `[getAllUsersService] Applied filter: pending (isActive = false)`
      );
    } else if (filter === "approved") {
      whereClause.isActive = true;
      logger.info(
        `[getAllUsersService] Applied filter: approved (isActive = true)`
      );
    }

    // Get total count with filters applied
    const total = await prisma.user.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(total / limit);

    // Fetch paginated users with filters
    const users = await prisma.user.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        clinicName: true,
        clinicAddress: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    logger.info(
      `[getAllUsersService] Fetched ${users.length} users (total: ${total})`
    );

    return { page, limit, total, totalPages, users };
  } catch (error: any) {
    logger.error(`[getAllUsersService Error]: ${error.message}`);
    throw error;
  }
};

export const approveUserService = async (userId: number) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true, isActive: true },
    });
    await createAndPublishNotification({
      userId,
      type: NotificationType.ACCOUNT_ACTIVATED,
      title: "Account Activated!",
      message: "Your account has been approved by the admin and is now active.",
      data: {
        approvedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });
    return updatedUser;
  } catch (error: any) {
    logger.error(`[approveUserService Error]: ${error.message}`);
    throw error;
  }
};
export const rejectedUserService = async (userId: number) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: false, isActive: false },
    });
    return updatedUser;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
};
export const deleteUserServices = async (userId: number) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deleteUser;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
};
export const getUserDataService = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { invoices: true },
    });
    return user;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
};
export const updateUserProfileService = async (
  id: number,
  body: UpdateUserProfileDto
) => {
  try {
    const { fullName, phoneNumber, clinicName, clinicAddress } = body;
    const dataToUpdate: any = {};
    if (fullName) dataToUpdate.fullName = fullName;
    if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
    if (clinicName) dataToUpdate.clinicName = clinicName;
    if (clinicAddress) dataToUpdate.clinicAddress = clinicAddress;
    if (Object.keys(dataToUpdate).length === 0) {
      throw new Error("No fields to update");
    }
    await checkUser(id);
    const user = await prisma.user.update({
      where: { id: id },
      data: dataToUpdate,
    });
    return user;
  } catch (error: any) {
    logger.error(`[updateUserProfileService  Error]: ${error.message}`);
    throw error;
  }
};
