import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/user.schema';
import { db } from '../config/db';
import { users } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Enregistrement d'un nouvel utilisateur
// Cette fonction permet à un nouvel utilisateur de s'inscrire en fournissant un email et un mot de passe
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const hashed = await bcrypt.hash(data.password, 10);
    const [existing] = await db.select().from(users).where(eq(users.email, data.email));

    if (existing) {
      logger.warn(`Tentative de double inscription : ${data.email}`);
      res.status(409).json({ error: 'Email déjà utilisé' });
      return;
    }

    const [newUser] = await db.insert(users).values({ email: data.email, password: hashed }).returning();
    logger.info(`Nouvel utilisateur inscrit : ${newUser.email}`);
    res.status(201).json({ message: 'Utilisateur créé', data: newUser });
  } catch (err: any) {
    logger.error('Erreur enregistrement utilisateur', err);
    res.status(500).json({ error: 'Erreur serveur lors de l’inscription' });
  }
};

// Connexion d'un utilisateur existant
// Cette fonction permet à un utilisateur de se connecter en fournissant son email et mot de passe
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (!user) {
      logger.warn(`Connexion échouée : utilisateur introuvable ${data.email}`);
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      logger.warn(`Connexion échouée : mot de passe invalide pour ${user.email}`);
      res.status(401).json({ error: 'Mot de passe invalide' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    logger.info(`Connexion réussie pour ${user.email}`);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err: any) {
    logger.error('Erreur lors de la connexion', err);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
};

