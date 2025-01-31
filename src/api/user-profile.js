import './sentry.js';
import { executeApiWithErrorHandling } from './_apiUtils';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  return executeApiWithErrorHandling(async (req, res, user) => {
    const db = getDBClient();
    const [profile] = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    if (!profile) {
      return res.status(200).json({ exists: false });
    }

    res.status(200).json({
      ...profile,
      academic_year: profile.academic_year || '',
      subjects: Array.isArray(profile.subjects) ? profile.subjects : [],
      predicted_grades: Array.isArray(profile.predicted_grades) ? profile.predicted_grades : [],
      location_preference: profile.location_preference || '',
      country: profile.country || '',
      skills: Array.isArray(profile.skills) ? profile.skills : []
    });
  }, req, res);
}