// TODO: User Service
// Purpose: Handle user database operations
// Usage: Called by user controller
// Responsibility: CRUD operations for users, role management, profile updates

import { error } from "console";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger.util";

export const getAllUsersService = async (req: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const total = await prisma.user.count();
    const totalPages = Math.ceil(total / limit);
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { page, limit, total, totalPages, users };
  } catch (error: any) {
    logger.error(`[getAllUsersService Error]: ${error.message}`);
    throw error;
  }
};

export const approveUserService = async (userId: number) => {
  try {

    const updatedUser = await prisma.user.update({
      where: {  id: userId  },
      data: {isVerified:true,isActive:true},
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
      where: {  id: userId  },
      data: {isVerified:false,isActive:false},
    });
    return updatedUser;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
};
export const deleteUserServices = async (userId:number)=> {
  try {
    const deleteUser = await prisma.user.delete({
      where: {  id: userId },
    });
    return deleteUser;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
}
export const getUserDataService = async (id:number)=> {
  try {
    const user = await prisma.user.findUnique({
      where: {  id: id },
      include:{invoices:true,orders:true}
    });
    return user;
  } catch (error: any) {
    logger.error(`[rejectUserService  Error]: ${error.message}`);
    throw error;
  }
}