import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const user_profiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().unique(),
  academic_year: text('academic_year'),
  subjects: text('subjects').array(),
  predicted_grades: text('predicted_grades').array(),
  location_preference: text('location_preference'),
  country: text('country'),
  skills: text('skills').array(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

export const user_specializations = pgTable('user_specializations', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  role_id: uuid('role_id').references(() => user_roles.id),
  specialization: text('specialization').notNull(),
  confirmed: boolean('confirmed').default(false),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});