import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';

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
          content: `Generate 10 free and 10 paid courses for ${role} from platforms like Coursera, Udemy, FutureLearn. Separate into free and paid. JSON format: { "free": [...], "paid": [...] }`
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