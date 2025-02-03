import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from '../_apiUtils.js';

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const answers = req.body;
    
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
          content: `Based on these work environment preferences: ${JSON.stringify(answers)}, suggest 5 organizations. Response format: {
            recommendations: [{
              name: "Company Name",
              description: "Brief description",
              website: "https://company.com",
              match_reasons: ["reason1", "reason2"]
            }]
          }`
        }]
      })
    });

    if (!response.ok) throw new Error('Perplexity API error');
    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    
    res.status(200).json(content);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}