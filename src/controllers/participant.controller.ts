import { Request, Response } from 'express';
import { db } from '../config/db';
import { participants } from '../models/participant.model';
import { createParticipantSchema } from '../schemas/participant.schema';
import { eq } from 'drizzle-orm';

export const createParticipant = async (req: Request, res: Response) => {
  try {
    const data = createParticipantSchema.parse(req.body);

    if (!req.user) return res.status(401).json({ error: 'Non autorisé' });

    const result = await db.insert(participants).values({
      eventId: data.eventId,
      userId: req.user.id,
    }).returning();

    res.status(201).json({ message: 'Inscription réussie', participant: result[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllParticipants = async (req: Request, res: Response) => {
  const result = await db.select().from(participants);
  res.json(result);
};

export const getParticipantById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await db.select().from(participants).where(eq(participants.id, id));

  if (result.length === 0) return res.status(404).json({ error: 'Inscription non trouvée' });
  res.json(result[0]);
};

export const deleteParticipant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await db.delete(participants).where(eq(participants.id, id)).returning();

  if (result.length === 0) return res.status(404).json({ error: 'Inscription non trouvée' });
  res.json({ message: 'Inscription annulée' });
};
