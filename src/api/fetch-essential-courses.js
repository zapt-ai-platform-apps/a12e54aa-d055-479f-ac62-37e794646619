import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from '../_apiUtils.js';

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const { role } = req.query;

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
          content: `Generate 15 essential courses for ${role} with direct enrollment links. Focus on core competencies. Respond in JSON: { "courses": [ { "name": "Course", "provider": "Provider", "link": "https://..." } ] }`
        }]
      })
    });

    const data = await response.json();
    const courses = JSON.parse(data.choices[0].message.content).courses;
    
    res.status(200).json({ courses });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}