// TODO: Authentication Controller
// Purpose: Handle authentication business logic
// Usage: Called from auth routes
// Responsibility: Implement register, login, logout, refreshToken methods
import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import logger from '../utils/logger.util';
import { errorResponse, successResponse } from '../utils/response.util';


/**
 * Handle user registration request
 */
export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    logger.info(`Registration successful: ${user.email}`);
    return res
      .status(201)
      .json(
        successResponse(
          user,
          'Registration successful. Awaiting admin approval.'
        )
      );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res
      .status(400)
      .json(errorResponse(error.message, 400));
  }
}

/**
 * Handle user login request
 */
export const login = async(req:Request,res:Response)=> {
    logger.info(`Login request received: ${req.body}`)
    try {
        const {email,password} = req.body;
        const data = await loginUser(email,password)
        res.json(data)
    }catch(err:any) {
        res.status(401).json({error:err.message })
    }
}

/**
 * Handle user logout request
 */
export function logout(req: Request, res: Response) {
  // TODO: Implement logout logic
}