// TODO: Encryption Utility
// Purpose: Handle data encryption, decryption, and password hashing
// Usage: Used by auth and user services
// Responsibility: Hash passwords, verify passwords, encrypt/decrypt sensitive data
import bcrypt from "bcrypt"

const saltRounds = parseInt(process.env.SALT_ROUNDS ?? "10");

export const bcryptPassword = async (password : string) =>{
    const hashedPassword = await bcrypt.hash(password,saltRounds)
    return hashedPassword
}


export const verifyPassword  =async (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}

