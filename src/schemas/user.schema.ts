import { z } from 'zod';

// Schéma de validation pour l'enregistrement et la connexion des utilisateurs
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = registerSchema; // même format que l'enregistrement
