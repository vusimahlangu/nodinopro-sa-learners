import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global { namespace Express { interface Request { userId?: number } } }

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token provided' });
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Token error' });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    // @ts-ignore
    req.userId = (decoded as any).userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}