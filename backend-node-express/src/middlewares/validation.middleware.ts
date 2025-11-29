// TODO: Input Validation Middleware (Joi)
// Purpose: Validate request body, params, and query against schemas
// Usage: Chain with routes to validate incoming data
// Responsibility: Validate data, strip unknown fields, return validation errors

import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { errorResponse } from '../utils/response.util';
import logger from '../utils/logger.util';

/**
 * Middleware factory to validate request body against a Joi schema
 * @param schema - Joi validation schema
 * @returns Express middleware function
 */
export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      logger.warn(`Validation error: ${errors.join(', ')}`);
      return res
        .status(400)
        .json(errorResponse(errors.join(', '), 400));
    }

    // Replace req.body with validated (cleaned) data
    req.body = value;
    next();
  };
}
