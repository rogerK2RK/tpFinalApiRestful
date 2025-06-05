import { Request, Response} from 'express';
import { registerSchema, loginSchema } from '../schemas/user.schema';
import { db } from '../config/db';
import { users } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashed = await bcrypt.hash(data.password, 10);

    const existing = await db.select().from(users).where(eq(users.email, data.email));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const newUser = await db
      .insert(users)
      .values({ email: data.email, password: hashed })
      .returning();

    res.status(201).json({ message: 'Utilisateur créé', user: newUser[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {

  try {
    const data = loginSchema.parse(req.body);
    const user = await db.select().from(users).where(eq(users.email, data.email));

    if (!user[0]) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const valid = await bcrypt.compare(data.password, user[0].password);
    if (!valid) return res.status(401).json({ error: 'Mot de passe invalide' });

    const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Connexion réussie', token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
