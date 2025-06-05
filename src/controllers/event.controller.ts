import { Request, Response } from 'express';
import { db } from '../config/db';
import { events } from '../models/event.model';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';
import { eq } from 'drizzle-orm';

// Créer un nouvel événement
// Cette fonction crée un nouvel événement dans la base de données
export const createEvent = async (req: Request, res: Response) => {
  try {
    const parsed = createEventSchema.parse(req.body);
    const data = {
      ...parsed,
      date: new Date(parsed.date),
    };

    const newEvent = await db.insert(events).values(data).returning();
    res.status(201).json({ message: 'Événement créé', event: newEvent[0] });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les événements
// Cette fonction récupère tous les événements de la base de données
export const getAllEvents = async (req: Request, res: Response) => {
  const result = await db.select().from(events);
  res.json(result);
};

// Récupérer un événement par ID
// Cette fonction récupère un événement spécifique par son ID
export const getEventById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await db.select().from(events).where(eq(events.id, id));

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(result[0]);
};


// Mettre à jour un événement
// Cette fonction met à jour un événement par son ID
export const updateEvent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const parsed = updateEventSchema.parse(req.body);

  const data = {
    ...parsed,
    date: parsed.date ? new Date(parsed.date) : undefined,
  };

  const result = await db.update(events).set(data).where(eq(events.id, id)).returning();

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json({ message: 'Événement mis à jour', event: result[0] });
};

// Supprimer un événement
// Cette fonction supprime un événement par son ID
export const deleteEvent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await db.delete(events).where(eq(events.id, id)).returning();

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json({ message: 'Événement supprimé' });
};
