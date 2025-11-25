// TODO: Authentication Controller
// Purpose: Handle authentication business logic
// Usage: Called from auth routes
// Responsibility: Implement register, login, logout, refreshToken methods
import { NextFunction, Request, Response } from "express";
import {
  forgotPasswordService,
  loginUser,
  refreshTokenService,
  registerUser,
  resetPasswordService,
} from "../services/auth.service";
import logger from "../utils/logger.util";
import { errorResponse, successResponse } from "../utils/response.util";
import { prisma } from "../lib/prisma";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";

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
          "Registration successful. Awaiting admin approval."
        )
      );
  } catch (error: any) {
    logger.error(`Registration controller error: ${error.message}`);
    return res.status(400).json(errorResponse(error.message, 400));
  }
}

/**
 * Handle user login request
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password,clientType } = req.body;
    logger.info(`Login request received: ${req.body}`);

    const userData = await loginUser(email, password, req, clientType);
    //WEB set httpOnly cookies
    if(clientType === "web"){
      res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", userData.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json(
      successResponse(
        // { accessToken: userData.accessToken },
        "Login successful"
      )
    );
    }
     // MOBILE: Return tokens in response body
    if (clientType === 'mobile') {
      return res.status(201).json(
        successResponse({
          user: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          },
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
        })
      );

    }
    //finally if not either web or mobile return 401
    return res.status(401).json(errorResponse("Invalid request", 401));
    
  } catch (err: any) {
    res.status(401).json(errorResponse(err.message, 401));
  }
};
/**
 * Handle user refreshToken request
 */

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const userAgent = req.headers['user-agent'] || 'unknown';  //  Get userAgent

    //  Check where token came from
    const hasCookies = !!req.cookies.refreshToken;
    const hasBearer = req.headers.authorization?.startsWith('Bearer ');

    // WEB: Has cookies, no bearer
    if (hasCookies && !hasBearer) {
      const { newAccessToken, newRefreshToken } = await refreshTokenService(
        req.cookies.refreshToken,
        'web',
        userAgent
      );

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      console.log("[Express] Set-Cookie headers:", res.getHeader('Set-Cookie'));

      return res.status(200).json(successResponse("Token refreshed successfully"));
    }

    // MOBILE: No cookies, has bearer  
    if (!hasCookies && hasBearer) {
      const token = req.headers.authorization!.substring(7);
      const { newAccessToken, newRefreshToken } = await refreshTokenService(
        token,
        'mobile',
        userAgent
      );

      return res.status(200).json(
        successResponse({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      );
    }

    // Invalid request
    return res.status(401).json(errorResponse('Invalid request', 401));

  } catch (err: any) {
    logger.error(`Refresh token error: ${err.message}`);

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json(errorResponse("Invalid or tampered refresh token", 403));
    }

    if (err.message === "No Refresh Token" || err.message === "Invalid or tampered refresh token") {
      return res.status(403).json(errorResponse(err.message, 403));
    }

    if (err.message === "Refresh token expired") {
      return res.status(403).json(errorResponse(err.message, 403));
    }

    if (err.message === "Account disabled or deleted" || err.message === "Please verify your email before login.") {
      return res.status(403).json(errorResponse(err.message, 403));
    }

    return res.status(500).json(errorResponse("Internal server error", 500, err));
  }
};


/**
 * Handle user logout request
 */
export const logout = async (req: Request, res: Response) => {
  try {
    //  Support both cookie and bearer token
    let refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        refreshToken = authHeader.substring(7);
      }
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    await prisma.session.deleteMany({ where: { refreshToken } });
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (err: any) {
    logger.error(`Logout error: ${err.message}`);
    return res.status(500).json(errorResponse("Internal server error", 500, err));
  }
};

/**
 * Handle user forgot password
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService(email);
    res.status(200).json(
      successResponse(
        {
          emailSent: true,
          tokenId: result.tokenId,
        },
        "Password reset email sent successfully"
      )
    );
  } catch (err: any) {
    logger.error(`forget password errror: ${err.message}`);
    return res
      .status(500)
      .json(errorResponse("Internal server error", 500, err));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //extract token query param token
    const token = req.query.token as string;
    const {  newPassword } = req.body;
    const result = await resetPasswordService(token, newPassword);
    return res
      .status(200)
      .json(
        successResponse({ passwordReset: true }, "Password reset successfully")
      );
  } catch (err: any) {
    logger.error(`forget password errror: ${err.message}`);
    return res
      .status(500)
      .json(errorResponse("Internal server error", 500, err));
  }
};
