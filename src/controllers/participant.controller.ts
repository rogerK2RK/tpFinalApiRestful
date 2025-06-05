import { Request, Response } from 'express';
import { db } from '../config/db';
import { participants } from '../models/participants.model';
import { eq } from 'drizzle-orm';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Créer une participation (user → event)
export const createParticipant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const eventId = parseInt(req.params.eventId);

    if (!userId) {
      res.status(401).json({ error: 'Non authentifié' });
      return;
    }

    const newParticipant = await db
      .insert(participants)
      .values({ userId, eventId })
      .returning();

    res.status(201).json({ message: 'Participation enregistrée', participant: newParticipant[0] });
    return; // 👈 ici aussi
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
};

// Récupérer les participants d’un événement
export const getParticipants = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.eventId);
  const result = await db.select().from(participants).where(eq(participants.eventId, eventId));
  res.json(result);
};

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}