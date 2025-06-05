import { z } from 'zod';

export const createParticipantSchema = z.object({
  eventId: z.number(),
});
