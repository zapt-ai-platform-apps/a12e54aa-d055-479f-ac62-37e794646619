import '../sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from '../_apiUtils.js';
import { roleExplorations, courses } from '../../drizzle/schema.js';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    if (req.method === 'POST') {
      const newExploration = await db.insert(roleExplorations)
        .values({
          userId: user.id,
          explorationType: 'guided',
          roleTitle: 'Guided Exploration',
          requiresEducation: false
        })
        .returning();

      return res.status(200).json({
        question: "Let's start with your interests. What subjects or activities do you most enjoy?",
        explorationId: newExploration[0].id
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Guided exploration error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to start exploration' });
  }
}