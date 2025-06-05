import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// On enrichit l'objet Request pour pouvoir stocker l'utilisateur décodé
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

// Middleware d'authentification
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    req.user = decoded; // Ajout des infos utilisateur dans req.user
    next(); // Poursuivre vers le contrôleur
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
