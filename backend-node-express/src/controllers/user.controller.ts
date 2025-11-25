// TODO: User Controller
// Purpose: Handle user-related requests
// Usage: Called from user routes
// Responsibility: Implement getProfile, updateProfile, listUsers, approveUser methods
import { date } from "joi";
import { approveUserService, deleteUserServices, getAllUsersService, getUserDataService, rejectedUserService, updateUserProfileService } from "../services/user.service";
import logger from "../utils/logger.util";
import { errorResponse, successResponse } from "../utils/response.util";
import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}


export async function getUserData(req: AuthRequest, res: Response) {
    try {
        const user = await getUserDataService(req.user!.id);
        return res
        .status(200)
        .json(successResponse({
          user
        }, "Fetched all users successfully"));
    } catch (error: any) {
        logger.error(`Registration controller error: ${error.message}`);
        return res.status(400).json(errorResponse(error.message, 400));
    }
}
export async function getAllUsers(req: AuthRequest, res: Response) {
    try {
        const {users, limit ,total , totalPages ,page} = await getAllUsersService(req);
        return res
        .status(200)
        .json(successResponse({
            data:{users},
            pagination: {
                limit
                ,total
                ,totalPages
                ,page
            }
            
        }, "Fetched all users successfully"));
    } catch (error: any) {
        logger.error(`Registration controller error: ${error.message}`);
        return res.status(400).json(errorResponse(error.message, 400));
    }
}

export async function createNewUser(req: AuthRequest, res: Response) {
  try {
    // return res
    //   .status(201)
    //   .json(
    //     successResponse(
    //       ,
    //       "Registration successful. Awaiting admin approval."
    //     )
    //   );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    // return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function changeUserStatus(req: AuthRequest, res: Response) {
  try {

    const userId = parseInt(req.params.id, 10);
    const action = (req.query.action || "").toString().toLocaleLowerCase()

    let  result ;
    if (action === "approve") {
        result = await approveUserService(userId)
    }else if(action === "reject") {
        result = await rejectedUserService(userId)
    }
    return res
      .status(201)
      .json(
        successResponse(
          result,
          "admin approve successfuly."
        )
      );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

export async function deleteUser(req: AuthRequest, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const result = await deleteUserServices(userId)
    return res.status(200).json(successResponse(result, "User deleted successfully"));
  } catch (error: any) {
    logger.error(`deleteUser controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

  export async function updateUserProfile(req: AuthRequest, res: Response) {
    try {
  
      const userId = parseInt(req.params.id, 10);
      const body = req.body
      const updated = await updateUserProfileService(userId,body)
      return res
        .status(201)
        .json(
          successResponse(
            updated,
            "admin approve successfuly."
          )
        );
    } catch (error: any) {
      logger.error(`Registration controller error: ${error.message}`);
      return res.status(400).json(errorResponse(error.message, 400));
    }
  }