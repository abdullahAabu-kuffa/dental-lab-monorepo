import { z } from "zod";


export const registerSchema = z.object(
    {
        fullName: z.string().min(5, "name must be 5 char at least , EX: Dr Ahmed Mohammed").regex(/^[a-zA-Z\s\.]+$/, "Username cannot be a number"),
        email: z.string().email("invalid mail"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Za-z]/, "Password must contain a letter")
            .regex(/[0-9]/, "Password must contain a number"),
        confirmPassword: z.string().min(8, "Confirm your password"),
        phoneNumber: z.string().regex(/^\+201[0125][0-9]{8}$/, "Phone number must start with +20 , for EX:+201234567890"),
        clinicName: z.string().min(3, "must be 3 char at least"),
        clinicAddress: z.string().min(3, "address can't be less than 3 chars")
    }
).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
});
export type RegisterInput = z.infer<typeof registerSchema>;
