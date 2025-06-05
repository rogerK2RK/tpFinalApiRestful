import { Request, Response } from 'express';
import { db } from '../config/db';
import { participants } from '../models/participants.model';
import { and, eq } from 'drizzle-orm';

export const createParticipant = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const eventId = req.params.eventId;

    if (!userId) {
      res.status(401).json({ error: 'Non authentifié' });
      return;
    }

    const existing = await db
      .select()
      .from(participants)
      .where(and(
        eq(participants.userId, userId),
        eq(participants.eventId, eventId)
      ));

    if (existing.length > 0) {
      res.status(400).json({ error: 'Déjà inscrit à cet événement' });
      return;
    }

    const result = await db
      .insert(participants)
      .values({ userId, eventId })
      .returning();

    res.status(201).json({ message: 'Inscription réussie', participant: result[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getParticipants = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  const result = await db
    .select()
    .from(participants)
    .where(eq(participants.eventId, eventId));

  res.json(result);
};
