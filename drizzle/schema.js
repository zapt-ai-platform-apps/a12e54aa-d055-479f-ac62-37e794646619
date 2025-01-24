import { pgTable, serial, text, timestamp, uuid, boolean, jsonb } from 'drizzle-orm/pg-core';

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

export const user_roles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  user_id: uuid('user_id').notNull(),
  role_title: text('role_title').notNull(),
  academic_year: text('academic_year'),
  subjects: text('subjects').array(),
  predicted_grades: text('predicted_grades').array(),
  country: text('country'),
  created_at: timestamp('created_at').defaultNow(),
  requires_higher_education: boolean('requires_higher_education'),
});