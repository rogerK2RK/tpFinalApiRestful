import { Request, Response } from 'express';
import { db } from '../config/db';
import { comments } from '../models/comment.model';
import { createCommentSchema } from '../schemas/comment.schema';
import { eq } from 'drizzle-orm';

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = createCommentSchema.parse(req.body);
    const userId = req.user?.id;
    const eventId = req.params.eventId;

    if (!userId) {
      res.status(401).json({ error: 'Non authentifié' });
      return;
    }

    const newComment = await db.insert(comments).values({
      content,
      userId,
      eventId, // tous trois doivent être string si déclarés uuid
    }).returning();

    res.status(201).json({ message: 'Commentaire ajouté', comment: newComment[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCommentsByEvent = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.params.eventId;

  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.eventId, eventId)); // eventId est string

  res.json(result);
};
