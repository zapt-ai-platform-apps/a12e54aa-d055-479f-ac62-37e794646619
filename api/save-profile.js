import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    const { 
      academicYear, 
      subjectGrades, 
      location, 
      country, 
      skills 
    } = req.body;

    // Convert subjectGrades to subjects and predictedGrades arrays
    const subjects = subjectGrades?.map(pair => pair.subject).filter(s => s) || [];
    const predictedGrades = subjectGrades?.map(pair => pair.grade).filter(g => g) || [];

    console.log('Preparing to save profile with data:', {
      user_id: user.id,
      academic_year: academicYear,
      subjects,
      predicted_grades: predictedGrades,
      location_preference: location,
      country,
      skills,
      updated_at: new Date()
    });

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

    console.log('Profile successfully saved for user:', user.id);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Profile save error:', error);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: error.message || 'Failed to save profile',
      details: error?.response?.data || null
    });
  }
}