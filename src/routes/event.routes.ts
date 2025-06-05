import { Router, RequestHandler } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Routes publiques
// Route pour récupérer tous les événements
router.get('/', getAllEvents as RequestHandler);
// Route pour récupérer un événement par son ID
router.get('/:id', getEventById as RequestHandler);

// Routes protégées
// Route pour créer un événement
router.post('/', authMiddleware as RequestHandler, createEvent as RequestHandler);
// Routes protégées pour les mises à jour et suppressions
router.put('/:id', authMiddleware as RequestHandler, updateEvent as RequestHandler);
// Route pour supprimer un événement
router.delete('/:id', authMiddleware as RequestHandler, deleteEvent as RequestHandler);

export default router;
