import { Request, Response } from 'express';
import { db } from '../config/db';
import { events } from '../models/event.model';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';
import { eq } from 'drizzle-orm';

// Contrôleur pour gérer les événements
export const createEvent = async (req: Request, res: Response) => {
  try {
    const parsed = createEventSchema.parse(req.body);

    // Convertir la date string en Date native JS
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
export const getAllEvents = async (req: Request, res: Response) => {
  const result = await db.select().from(events);
  res.json(result);
};

// Récupérer un événement par son ID
export const getEventById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await db.select().from(events).where(eq(events.id, id));

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(result[0]);
};

// Mettre à jour un événement
export const updateEvent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const parsed = updateEventSchema.parse(req.body);

  // Convertir la date si elle existe
  const data = {
    ...parsed,
    date: parsed.date ? new Date(parsed.date) : undefined,
  };

  const result = await db.update(events).set(data).where(eq(events.id, id)).returning();

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json({ message: 'Événement mis à jour', event: result[0] });
};

// Supprimer un événement
export const deleteEvent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = await db.delete(events).where(eq(events.id, id)).returning();

  if (result.length === 0) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json({ message: 'Événement supprimé' });
};
