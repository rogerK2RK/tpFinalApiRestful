import { Request, Response } from 'express';
import { categorySchema } from '../schemas/category.schema';
import { db } from '../config/db';
import { categories } from '../models/category.model';
import { eq } from 'drizzle-orm';

// Créer une catégorie
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = categorySchema.parse(req.body);
    const newCategory = await db.insert(categories).values(data).returning();

    res.status(201).json({ message: 'Catégorie créée', category: newCategory[0] });
    return;
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
};

// Récupérer une catégorie par son ID
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  const all = await db.select().from(categories);
  res.json(all);
  return;
};
