import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from '../_apiUtils.js';
import { user_roles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    const roles = await db.select()
      .from(user_roles)
      .where(eq(user_roles.user_id, user.id));

    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}