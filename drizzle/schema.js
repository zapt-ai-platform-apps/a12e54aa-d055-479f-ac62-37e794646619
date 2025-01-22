import { pgTable, serial, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const savedRoles = pgTable('saved_roles', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  role: text('role').notNull(),
  courses: jsonb('courses').notNull(),
  requirements: text('requirements').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});