import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { user_profiles } from '../drizzle/schema.js';

const client = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(client);

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { academicYear, subjects, predictedGrades, location, skills } = req.body;

    // Convert comma-separated strings to arrays
    const subjectsArray = subjects.split(',').map(s => s.trim());
    const gradesArray = predictedGrades.split(',').map(s => s.trim());
    const skillsArray = skills.split(',').map(s => s.trim());

    await db.insert(user_profiles).values({
      user_id: user.id,
      academic_year: academicYear,
      subjects: subjectsArray,
      predicted_grades: gradesArray,
      location_preference: location,
      skills: skillsArray
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Profile save error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}