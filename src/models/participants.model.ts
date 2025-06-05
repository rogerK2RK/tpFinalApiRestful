import { pgTable, serial, uuid, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user.model';
import { events } from './event.model';

export const participants = pgTable('participants', {
  userId: uuid('user_id').notNull().references(() => users.id),
  eventId: uuid('event_id').notNull().references(() => events.id),
});

// Relations (facultatif mais utile si tu fais des jointures plus tard)
export const participantsRelations = relations(participants, ({ one }) => ({
  user: one(users, { fields: [participants.userId], references: [users.id] }),
  event: one(events, { fields: [participants.eventId], references: [events.id] }),
}));
