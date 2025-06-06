import { z } from 'zod';

// Schéma de validation pour les événements
export const createEventSchema = z.object({
  title: z.string().min(4, { message: "Le titre est requis" }),
  description: z.string().optional(),
  location: z.string().optional(),
  date:  z.coerce.date({ 
    required_error: "La date est requise", 
    invalid_type_error: "La date doit être valide (ex: 2024-12-31)" 
  }),
});

// Schéma de validation pour la création d'un événement
export const updateEventSchema = createEventSchema.partial(); // Tous les champs deviennent optionnels
