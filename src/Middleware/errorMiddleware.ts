import { Request , Response , NextFunction } from "express";

interface CustomError extends Error {
    status?: number;
}


export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message
    });
};