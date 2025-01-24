import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const client = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(client);

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { academicYear, subjects, predictedGrades, location, skills } = req.body;

    await db.insert(user_profiles).values({
      user_id: user.id,
      academic_year: academicYear,
      subjects: subjects,
      predicted_grades: predictedGrades,
      location_preference: location,
      skills: skills
    });

    res.status(200).json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}