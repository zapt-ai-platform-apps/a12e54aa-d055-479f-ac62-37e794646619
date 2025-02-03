import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from '../_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { fetchWithRetry } from './_coursesApiRetry.js';
import { generatePrompt } from './_coursesPromptUtils.js';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    // Authenticate user
    const user = await authenticateUser(req);
    if (!user) throw new Error('User not authenticated');

    // Validate role parameter
    const { role } = req.query;
    if (!role || typeof role !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing role parameter' });
    }

    console.log('Fetching courses for role:', role, 'for user:', user.id);

    // Get user's academic profile
    const [userProfile] = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    console.log('User profile:', userProfile);

    const prompt = generatePrompt(userProfile, role);
    console.log('Generated prompt:', prompt);

    // Use retry mechanism with exponential backoff
    const validCourses = await fetchWithRetry(prompt, 3);

    res.status(200).json({ courses: validCourses });
    
  } catch (error) {
    console.error('Courses API Error:', {
      message: error.message,
      stack: error.stack,
      request: {
        role: req.query.role,
        user: req.user?.id
      }
    });

    Sentry.captureException(error);

    const statusCode = error.message.includes('missing') ? 500 : 400;
    res.status(statusCode).json({ 
      error: error.message || 'Failed to fetch courses',
      details: error.response?.data || null 
    });
  }
}