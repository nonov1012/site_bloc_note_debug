import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Extend Express Request to include user info
export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

// Middleware to verify JWT token
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user owns the resource (for users)
export const authorizeUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const resourceId = parseInt(idParam, 10);

  if (req.user?.id !== resourceId) {
    res.status(403).json({ message: 'Access denied: you can only modify your own account' });
    return;
  }

  next();
};
