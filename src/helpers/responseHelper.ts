// responseHelper.js
import type { Response } from "express";


export interface ErrorDetail {
    msg: string;
    param?: string;
    location?: string;
}

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message: string = 'Operación exitosa',
    statusCode: number = 200
): Response => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data: data || {},
        statusCode
    });
};

export const sendErrors = (
    res: Response,
    errors: ErrorDetail[],
    message: string = 'Ocurrió un error',
    statusCode: number = 400
): Response => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        errors,
    });
};
