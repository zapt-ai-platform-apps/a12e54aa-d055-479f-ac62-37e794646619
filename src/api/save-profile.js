import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { academicYear, subjects, predictedGrades, location, country, skills } = req.body;

    await db.insert(user_profiles)
      .values({
        user_id: user.id,
        academic_year: academicYear,
        subjects: subjects,
        predicted_grades: predictedGrades,
        location_preference: location,
        country: country,
        skills: skills,
        updated_at: new Date()
      })
      .onConflictDoUpdate({
        target: user_profiles.user_id,
        set: {
          academic_year: academicYear,
          subjects: subjects,
          predicted_grades: predictedGrades,
          location_preference: location,
          country: country,
          skills: skills,
          updated_at: new Date()
        }
      });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Profile save error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}