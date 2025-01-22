import { createEvent } from '../src/supabaseClient';
import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const { prompt } = req.body;
    
    console.log('Processing AI request for user:', user.id);
    const response = await createEvent('chatgpt_request', {
      prompt: `As a career coach, respond to this student query: ${prompt}`,
      response_type: 'text'
    });

    res.status(200).json({ result: response });
  } catch (error) {
    console.error('AI API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to process request' });
  }
}