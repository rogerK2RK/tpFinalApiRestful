import { pgTable, serial, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user.model';
import { events } from './event.model';

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  eventId: integer('event_id').references(() => events.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations (facultatif mais utile si tu fais des jointures plus tard)
export const participantsRelations = relations(participants, ({ one }) => ({
  user: one(users, { fields: [participants.userId], references: [users.id] }),
  event: one(events, { fields: [participants.eventId], references: [events.id] }),
}));
