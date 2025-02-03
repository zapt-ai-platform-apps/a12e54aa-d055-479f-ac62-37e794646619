import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from '../_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    console.log('Fetching profile for user ID:', user.id);
    const profile = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    console.log('Profile query result:', profile);
    
    if (profile.length === 0) {
      return res.status(200).json({ exists: false });
    }

    res.status(200).json(profile[0]);
  } catch (error) {
    console.error('Error checking user profile:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to fetch profile' });
  }
}