import { Request, Response, NextFunction, RequestHandler } from 'express';

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const { user, franchiseId, adminId } = req.session || {};

  if (user && (franchiseId || adminId)) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized: Please login first' });
  return;
};





