import { z } from 'zod';

// Schéma de validation pour les événements
export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z.string().datetime(), // ISO 8601
});

// Schéma de validation pour la création d'un événement
export const updateEventSchema = createEventSchema.partial(); // Tous les champs deviennent optionnels
