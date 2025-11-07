// TODO: Authentication Service
// Purpose: Handle authentication business logic (decoupled from Express)
// Usage: Called by auth controller
// Responsibility: User registration, login verification, JWT generation, token refresh

import { bcryptPassword, verifyPassword } from "../utils/encryption.util";
import { generateAccessToken } from "../utils/token.util";



export const loginUser = async (email: string, password: string) => {

    const hashedPassword =await bcryptPassword(password)
    const verfied = await verifyPassword(password,hashedPassword)
    const accessToken = generateAccessToken({ id: "2", email });
    console.log(hashedPassword,verfied ,accessToken);
    return { accessToken: accessToken, refreshToken: 'dummy-refresh', user: { email } };
};
