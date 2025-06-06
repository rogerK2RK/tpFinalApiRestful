import { Request, Response } from 'express';
import { db } from '../config/db';
import { participants } from '../models/participants.model';
import { and, eq } from 'drizzle-orm';
import { logger } from '../utils/logger';

// Créer un participant
// Cette fonction permet à un utilisateur de s'inscrire à un événement
export const createParticipant = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const eventId = req.params.eventId;

  if (!userId) {
    logger.warn('Tentative d’inscription sans authentification');
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  try {
    const [existing] = await db
      .select()
      .from(participants)
      .where(and(
        eq(participants.userId, userId),
        eq(participants.eventId, eventId)
      ));

    if (existing) {
      logger.info('Utilisateur déjà inscrit à cet événement', { userId, eventId });
      res.status(400).json({ error: 'Déjà inscrit à cet événement' });
      return;
    }

    const [participant] = await db
      .insert(participants)
      .values({ userId, eventId })
      .returning();

    logger.info('Utilisateur inscrit avec succès', { userId, eventId });
    res.status(201).json({ message: 'Inscription réussie', data: participant });

  } catch (err) {
    logger.error('Erreur lors de l’inscription', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les participants d'un événement
// Cette fonction récupère tous les participants d'un événement spécifique
export const getParticipants = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.params.eventId;

  try {
    const result = await db
      .select()
      .from(participants)
      .where(eq(participants.eventId, eventId));

    res.status(200).json({ data: result });
  } catch (err) {
    logger.error('Erreur lors de la récupération des participants', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
