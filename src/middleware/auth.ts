import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'No se proporcionó token de autenticación',
            errors: [{ msg: 'Token no proporcionado', param: 'token', location: 'header' }]
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto');
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ 
            message: 'Token inválido o expirado',
            errors: [{ msg: 'Token inválido', param: 'token', location: 'header' }]
        });
    }
}; 