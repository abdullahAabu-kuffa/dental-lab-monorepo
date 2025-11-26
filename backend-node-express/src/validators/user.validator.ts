// TODO: User Input Validators
// Purpose: Define Joi validation schemas for user endpoints
// Usage: Chain with routes for input validation
// Responsibility: Validate register, login, profile update schemas

import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required().messages({
    "string.min": "Full name must be at least 2 characters",
    "any.required": "Full name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Must be a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "any.required": "Password is required",
    }),
  phoneNumber: Joi.string()
    .pattern(/^(\+20|0)(10|11|12|15)[0-9]{8}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid Egyptian number (e.g., +201012345678 or 01012345678)",
      "any.required": "Phone number is required",
    }),
  clinicName: Joi.string().min(2).max(200).required().messages({
    "string.min": "Clinic name must be at least 2 characters",
    "any.required": "Clinic name is required",
  }),
  clinicAddress: Joi.string().min(5).max(500).required().messages({
    "string.min": "Clinic address must be at least 5 characters",
    "any.required": "Clinic address is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Must be a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  //clientType either web or mobile
  clientType: Joi.string().valid("web", "mobile").required().messages({
    "any.only": "Client type must be either 'web' or 'mobile'",
    "any.required": "Client type is required",
  }),
});
