import { db } from '../config/db';
import { events } from '../models/event.model';
import { eq } from 'drizzle-orm';
import { NewEvent } from '../types/event'; // Optionnel, pour typer

// les données d'un nouvel événement
// Créer un nouvel événement
// Cette fonction crée un nouvel événement dans la base de données
export const createEvent = async (data: NewEvent) => {
  return db.insert(events).values(data).returning();
};

// Récupérer tous les événements
// Cette fonction récupère tous les événements de la base de données
export const getAllEvents = async () => {
  return db.select().from(events);
};

// Récupérer un événement par ID
// Cette fonction récupère un événement spécifique par son ID
export const getEventById = async (id: string) => {
  return db.select().from(events).where(eq(events.id, id));
};

// Mettre à jour un événement
// Cette fonction met à jour un événement existant dans la base de données
export const updateEvent = async (id: string, data: Partial<NewEvent>) => {
  return db.update(events).set(data).where(eq(events.id, id)).returning();
};

// Supprimer un événement
// Cette fonction supprime un événement de la base de données par son ID
export const deleteEvent = async (id: string) => {
  return db.delete(events).where(eq(events.id, id)).returning();
};
