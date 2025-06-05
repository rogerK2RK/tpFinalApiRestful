import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';

const router = Router();

// Créer une catégorie
router.post('/', createCategory);

// Récupérer toutes les catégories
router.get('/', getCategories);

export default router;
