import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
