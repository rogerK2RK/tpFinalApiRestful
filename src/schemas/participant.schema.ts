import { z } from 'zod';

// Schéma de validation pour les participants
export const createParticipantSchema = z.object({
  eventId: z.number(),
});
