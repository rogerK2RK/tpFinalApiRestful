import { Router, RequestHandler } from 'express';
import {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  deleteParticipant,
} from '../controllers/participant.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Define routes for participant operations
router.get('/', getAllParticipants as RequestHandler);
// Get all participants
router.get('/:id', getParticipantById as RequestHandler);

// Get participant by ID
router.post('/', authMiddleware as RequestHandler, createParticipant as RequestHandler);
// Create a new participant
router.delete('/:id', authMiddleware as RequestHandler, deleteParticipant as RequestHandler);

export default router;
