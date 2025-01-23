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
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: `Analyze career conversation to determine education requirements. Use function calling to output JSON with:
        - next_question: string
        - roles: array if complete
        - requires_higher_education: boolean`
      }, {
        role: 'user',
        content: prompt
      }],
      functions: [{
        name: 'career_analysis',
        description: 'Analyze career conversation and education requirements',
        parameters: {
          type: 'object',
          properties: {
            next_question: { type: 'string' },
            roles: { 
              type: 'array',
              items: { type: 'string' }
            },
            requires_higher_education: { type: 'boolean' }
          },
          required: ['next_question', 'requires_higher_education']
        }
      }],
      function_call: { name: 'career_analysis' }
    });

    const result = JSON.parse(completion.choices[0].message.function_call.arguments);
    res.status(200).json(result);
  } catch (error) {
    console.error('AI API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Failed to process request' });
  }
}