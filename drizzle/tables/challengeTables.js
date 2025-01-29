import { pgTable, uuid, text, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const niche_challenges = pgTable('niche_challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  role_id: uuid('role_id').references(() => user_roles.id),
  prompt: text('prompt').notNull(),
  expected_answer_keywords: text('expected_answer_keywords').array(),
  difficulty_level: text('difficulty_level').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export const challenge_responses = pgTable('challenge_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  challenge_id: uuid('challenge_id').references(() => niche_challenges.id),
  response: text('response').notNull(),
  feedback: text('feedback').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export const role_explorations = pgTable('role_explorations', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  exploration_type: text('exploration_type').notNull(),
  role_title: text('role_title').notNull(),
  requires_education: boolean('requires_education').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export const saved_roles = pgTable('saved_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  role: text('role').notNull(),
  courses: json('courses').notNull(),
  requirements: text('requirements').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});