import { pgTable, serial, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './user.model';
import { events } from './event.model';

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  eventId: integer('event_id').references(() => events.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
