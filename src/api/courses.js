import './sentry.js';
import { executeApiWithErrorHandling } from './_apiUtils';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { generatePrompt, fetchWithRetry } from './_coursesUtils.js';

export default async function handler(req, res) {
  return executeApiWithErrorHandling(async (req, res, user) => {
    const { role } = req.query;
    if (!role || typeof role !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing role parameter' });
    }

    console.log('Fetching courses for role:', role, 'for user:', user.id);

    const db = getDBClient();
    const [userProfile] = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    console.log('User profile:', userProfile);

    const prompt = generatePrompt(userProfile, role);
    console.log('Generated prompt:', prompt);

    const validCourses = await fetchWithRetry(prompt, 3);
    res.status(200).json({ courses: validCourses });
  }, req, res);
}