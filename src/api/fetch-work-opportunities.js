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
          content: `Find 15 current work experience opportunities for ${role} including free internships and paid programs. Include titles, summaries and direct links. JSON format: { "opportunities": [ { "title": "...", "summary": "...", "link": "https://..." } ] }`
        }]
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    res.status(200).json(result);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}