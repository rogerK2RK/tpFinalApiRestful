import { Request, Response } from 'express';
import { db } from '../config/db';
import { comments } from '../models/comment.model';
import { createCommentSchema } from '../schemas/comment.schema';
import { eq } from 'drizzle-orm';
import { logger } from '../utils/logger';

// Ajouter un commentaire
// Cette fonction permet à un utilisateur authentifié d'ajouter un commentaire à un événement
export const addComment = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const eventId = req.params.eventId;

  if (!userId) {
    logger.warn('Commentaire refusé : utilisateur non authentifié');
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  try {
    const { content } = createCommentSchema.parse(req.body);

    const [newComment] = await db.insert(comments).values({
      content,
      userId,
      eventId,
    }).returning();

    logger.info('Commentaire ajouté', { userId, eventId });
    res.status(201).json({ message: 'Commentaire ajouté', data: newComment });
  } catch (err: any) {
    logger.error('Erreur lors de l’ajout du commentaire', err);
    res.status(500).json({ error: 'Erreur lors de l’ajout du commentaire' });
  }
};

// Récupérer les commentaires d'un événement
// Cette fonction récupère tous les commentaires associés à un événement spécifique
export const getCommentsByEvent = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.params.eventId;

  try {
    const result = await db
      .select()
      .from(comments)
      .where(eq(comments.eventId, eventId));

    res.status(200).json({ data: result });
  } catch (err) {
    logger.error('Erreur lors de la récupération des commentaires', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
