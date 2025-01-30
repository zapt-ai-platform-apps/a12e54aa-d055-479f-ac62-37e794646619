import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser, getDBClient } from './_apiUtils.js';
import { user_profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = getDBClient();

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    if (!user) throw new Error('User not authenticated');

    const { role } = req.query;
    if (!role) throw new Error('Role parameter is required');

    // Get user's academic profile using Drizzle
    const [userProfile] = await db.select()
      .from(user_profiles)
      .where(eq(user_profiles.user_id, user.id));

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-medium-online',
        messages: [{
          role: 'user',
          content: `Generate 15 courses for ${role} considering these factors: 
          - Academic Year: ${userProfile?.academic_year || 'Not specified'}
          - Subjects: ${userProfile?.subjects?.join(', ') || 'Not specified'}
          - Predicted Grades: ${userProfile?.predicted_grades?.join(', ') || 'Not specified'}
          - Location: ${userProfile?.country || 'Any'}
          Respond in JSON format: { "courses": [ { "name": "Course Name", "provider": "University Name", "link": "https://example.com", "is_higher_education": boolean } ] }`
        }]
      })
    });

    if (!response.ok) throw new Error('Perplexity API error');
    const data = await response.json();
    
    const parsedData = JSON.parse(data.choices[0].message.content);
    if (!parsedData?.courses) throw new Error('Invalid course data format');

    res.status(200).json({ courses: parsedData.courses });
  } catch (error) {
    console.error('Courses API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch courses',
      details: error.response?.data || null 
    });
  }
}