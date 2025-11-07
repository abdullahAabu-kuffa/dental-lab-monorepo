// TODO: Authentication Controller
// Purpose: Handle authentication business logic
// Usage: Called from auth routes
// Responsibility: Implement register, login, logout, refreshToken methods
import { Request, Response } from 'express';
import { error } from "console"
import { loginUser } from '../services/auth.service';

export const login = async(req:Request,res:Response)=> {
    try {
        const {email,password} = req.body;
        const data = await loginUser(email,password)
        res.json(data)
    }catch(err:any) {
        res.status(401).json({error:err.message })
    }
}