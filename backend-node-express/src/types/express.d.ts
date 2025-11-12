/// <reference types="express" />

//TODO: Custom Express types


import * as express from 'express';

//extend express.Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}
export {};


//how to use 
// export function someMiddleware(req: Request, res: Response, next: NextFunction) {
//   if (req.user && req.user.isVerified) {
//     // Safe to assume user is verified
//   }

//   if (req.requestId) {
//     logger.info(`Request ID: ${req.requestId}`);
//   }

//   next();
// }