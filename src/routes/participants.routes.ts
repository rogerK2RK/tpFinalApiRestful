import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createParticipant, getParticipants } from '../controllers/participant.controller';

const router = Router();

// Un utilisateur s’inscrit à un event (token obligatoire)
router.post('/:eventId', authMiddleware, createParticipant);

// Voir tous les participants d’un event
router.get('/:eventId', getParticipants);

export default router;
