import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    const profile = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    res.status(200).json(profile.length > 0 ? profile[0] : { exists: false });
  } catch (error) {
    console.error('Error checking user profile:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}