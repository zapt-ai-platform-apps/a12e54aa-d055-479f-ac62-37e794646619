import { createEvent } from '../src/supabaseClient';
import { authenticateUser } from './_apiUtils.js';
import * as Sentry from '@sentry/node';

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
    await authenticateUser(req);
    const { messages } = req.body;

    const response = await createEvent('chatgpt_request', {
      prompt: `Continue career discovery conversation. Previous messages: ${JSON.stringify(messages)}. Respond in JSON format: {
        "question": "next question",
        "roles": ["role1", "role2"] if complete,
        "complete": boolean
      }`,
      response_type: 'json'
    });

    res.status(200).json(response);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: error.message });
  }
}