import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const getAdminDashboard: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (token) {
            jwt.verify(token, secret);
        } else {
            throw new Error('Token is not defined');
        }
        res.json({ message: 'Welcome to the Admin Dashboard' });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    return;
};

export default getAdminDashboard;