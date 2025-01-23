import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { niche_challenges } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const client = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(client);

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const roleId = req.query.role_id;

    const challenges = await db.select()
      .from(niche_challenges)
      .where(eq(niche_challenges.role_id, roleId))
      .orderBy(niche_challenges.difficulty_level);

    res.status(200).json({ challenges });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}