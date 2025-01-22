import * as Sentry from '@sentry/node';
import { authenticateUser } from './_apiUtils.js';
import OpenAI from 'openai';

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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const { prompt } = req.body;
    
    console.log('Processing AI request');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'You are a career coach helping students explore career options. Respond conversationally.'
      }, {
        role: 'user',
        content: prompt
      }]
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error('AI API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to process request' });
  }
}