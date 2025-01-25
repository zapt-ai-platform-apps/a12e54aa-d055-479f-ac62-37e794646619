import { pgTable, uuid, text, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const user_roles = pgTable('user_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  role_title: text('role_title').notNull(),
  academic_year: text('academic_year'),
  subjects: text('subjects').array(),
  predicted_grades: text('predicted_grades').array(),
  country: text('country'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  requires_higher_education: boolean('requires_higher_education'),
});

export const saved_courses = pgTable('saved_courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  role_id: uuid('role_id').references(() => user_roles.id, { onDelete: 'cascade' }),
  provider_name: text('provider_name').notNull(),
  course_title: text('course_title').notNull(),
  course_url: text('course_url').notNull(),
  is_higher_education: boolean('is_higher_education'),
  saved_at: timestamp('saved_at', { withTimezone: true }).defaultNow(),
});

export const user_profiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().unique(),
  academic_year: text('academic_year'),
  subjects: text('subjects').array(),
  predicted_grades: text('predicted_grades').array(),
  location_preference: text('location_preference'),
  skills: text('skills').array(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});