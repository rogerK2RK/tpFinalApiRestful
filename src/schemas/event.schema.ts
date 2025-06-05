import { z } from 'zod';

// Schéma de validation pour les événements
export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Format de date invalide (YYYY-MM-DD attendu)",
  }),
});

// Schéma de validation pour la création d'un événement
export const updateEventSchema = createEventSchema.partial(); // Tous les champs deviennent optionnels
