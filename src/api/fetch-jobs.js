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
          content: `Find 15 current entry-level or graduate job listings for ${role} from LinkedIn and other job boards. Include direct apply links. Response format: {
            jobs: [{
              title: "Job Title",
              company: "Company Name",
              description: "Brief job summary",
              link: "https://job-link.com",
              location: "Job Location",
              posted: "Posting date"
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