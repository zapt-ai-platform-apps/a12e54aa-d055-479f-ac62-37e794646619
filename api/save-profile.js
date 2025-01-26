import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { academicYear, subjects, predictedGrades, location, skills } = req.body;

    const subjectsArray = subjects?.split(',').map(s => s.trim()) || [];
    const gradesArray = predictedGrades?.split(',').map(s => s.trim()) || [];
    const skillsArray = skills?.split(',').map(s => s.trim()) || [];

    await db.insert(user_profiles).values({
      user_id: user.id,
      academic_year: academicYear,
      subjects: subjectsArray,
      predicted_grades: gradesArray,
      location_preference: location,
      skills: skillsArray
    }).onConflictDoUpdate({
      target: user_profiles.user_id,
      set: {
        academic_year: academicYear,
        subjects: subjectsArray,
        predicted_grades: gradesArray,
        location_preference: location,
        skills: skillsArray,
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