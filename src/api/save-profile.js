import './sentry.js';
import { executeApiWithErrorHandling } from './_apiUtils';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  return executeApiWithErrorHandling(async (req, res, user) => {
    const { 
      academicYear, 
      subjectGrades, 
      location, 
      country, 
      skills 
    } = req.body;

    const subjects = subjectGrades?.map(pair => pair.subject).filter(s => s) || [];
    const predictedGrades = subjectGrades?.map(pair => pair.grade).filter(g => g) || [];

    const db = getDBClient();
    const profileData = {
      user_id: user.id,
      academic_year: academicYear,
      subjects: subjects,
      predicted_grades: predictedGrades,
      location_preference: location,
      country: country,
      skills: skills,
      updated_at: new Date()
    };

    await db.insert(user_profiles)
      .values(profileData)
      .onConflictDoUpdate({
        target: user_profiles.user_id,
        set: profileData
      });

    res.status(200).json({ success: true });
  }, req, res);
}