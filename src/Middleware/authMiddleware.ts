import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'
import {RequestUser} from "../types/requestUser";
const JWT_SECRET = '75911006393537b222637773603aa808dcfa871cfc29a90e51427c5bb7f6c0579ce4f5fa05042a237cb0200dc95055407d9873f0a910722c8db6b2d9dbb2b188'


export function authMiddleware(req : RequestUser, res : Response , next : NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId ;
        return  next()
    } catch (e) {
        res.status(400).json({ message: 'Invalid token' });
    }

}