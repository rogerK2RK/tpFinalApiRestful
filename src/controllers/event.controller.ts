import { Request, Response } from 'express';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';
import * as EventService from '../services/event.service';
import { logger } from '../utils/logger';

// Créer un nouvel événement
// Cette fonction crée un nouvel événement dans la base de données
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = createEventSchema.parse(req.body);
    const [newEvent] = await EventService.createEvent({ ...data, date: new Date(data.date) });

    res.status(201).json({ message: 'Événement créé', data: newEvent });
  } catch (err: any) {
    logger.error('Erreur création événement:', err);
    const message = err?.message || 'Erreur lors de la création';
    res.status(400).json({ error: message });
  }
};

// Récupérer tous les événements
// Cette fonction récupère tous les événements de la base de données
export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allEvents = await EventService.getAllEvents();
    res.status(200).json({ data: allEvents });
  } catch (err) {
    logger.error('Erreur récupération événements:', err);
    res.status(500).json({ error: 'Erreur interne serveur' });
  }
};

// Récupérer un événement par ID
// Cette fonction récupère un événement spécifique par son ID
export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [event] = await EventService.getEventById(req.params.id);
    if (!event) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }

    res.status(200).json({ data: event });
  } catch (err) {
    logger.error('Erreur récupération événement par ID:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour un événement
// Cette fonction met à jour un événement par son ID
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = updateEventSchema.parse(req.body);
    const [updated] = await EventService.updateEvent(req.params.id, {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    });

    if (!updated) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }

    res.status(200).json({ message: 'Événement mis à jour', data: updated });
  } catch (err: any) {
    logger.error('Erreur mise à jour événement:', err);
    const message = err?.message || 'Erreur lors de la mise à jour';
    res.status(400).json({ error: message });
  }
};

// Supprimer un événement
// Cette fonction supprime un événement par son ID
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const [deleted] = await EventService.deleteEvent(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: 'Événement introuvable' });
      return;
    }

    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (err) {
    logger.error('Erreur suppression événement:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
