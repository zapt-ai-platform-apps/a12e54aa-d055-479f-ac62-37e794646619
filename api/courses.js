import { authenticateUser } from './_apiUtils.js';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const { role, type } = req.query;

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
          content: `Generate 15 ${type} courses for ${role}. Respond in JSON format: { "courses": [ { "name": "Course Name", "provider": "University Name", "link": "https://example.com" } ] }`
        }]
      })
    });

    if (!response.ok) throw new Error('Perplexity API error');
    const data = await response.json();
    const courses = JSON.parse(data.choices[0].message.content).courses;
    
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Courses API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to fetch courses' });
  }
}