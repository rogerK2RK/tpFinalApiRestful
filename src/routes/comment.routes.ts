import { Router } from 'express';
import { addComment, getCommentsByEvent } from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/:eventId', authMiddleware, addComment);  // créer un commentaire
router.get('/:eventId', getCommentsByEvent);           // voir les commentaires d'un event

export default router;
