import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { events } from './event.model';
import { users } from './user.model';

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  eventId: uuid("event_id").notNull().references(() => events.id),

  createdAt: timestamp('created_at').defaultNow(),
});
