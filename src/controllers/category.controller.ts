import { Request, Response } from 'express';
import { categorySchema } from '../schemas/category.schema';
import { db } from '../config/db';
import { categories } from '../models/category.model';
import { logger } from '../utils/logger';

// Créer une catégorie
// Cette fonction permet de créer une nouvelle catégorie dans la base de données
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = categorySchema.parse(req.body);
    const [newCategory] = await db.insert(categories).values(data).returning();

    logger.info(`Catégorie créée : ${newCategory.name}`);
    res.status(201).json({ message: 'Catégorie créée', data: newCategory });
  } catch (err: any) {
    logger.error('Erreur création catégorie', err);
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une catégorie par son ID
// Cette fonction permet de récupérer une catégorie spécifique par son ID
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allCategories = await db.select().from(categories);
    res.status(200).json({ data: allCategories });
  } catch (err) {
    logger.error('Erreur récupération catégories', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
