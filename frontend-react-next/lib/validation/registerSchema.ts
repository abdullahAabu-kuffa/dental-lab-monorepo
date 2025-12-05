import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be at most 100 characters"),

    email: z
      .string()
      .email("Must be a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one letter and one number"
      ),

    confirmPassword: z
      .string()
      .min(6, "Confirm your password"),

    phoneNumber: z
      .string()
      .regex(
        /^(\+20|0)(10|11|12|15)[0-9]{8}$/,
        "Phone number must be a valid Egyptian number (e.g., +201012345678 or 01012345678)"
      ),

    clinicName: z
      .string()
      .min(2, "Clinic name must be at least 2 characters")
      .max(200, "Clinic name must be at most 200 characters"),

    clinicAddress: z
      .string()
      .min(5, "Clinic address must be at least 5 characters")
      .max(500, "Clinic address must be at most 500 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
