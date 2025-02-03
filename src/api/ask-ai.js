import './sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from '../_apiUtils.js';
import openai from './openai-client.js';
import { createCareerAnalysis } from '../lib/ai-utils.js';

export default async function handler(req, res) {
  try {
    await authenticateUser(req);
    const { prompt } = req.body;
    
    const completion = await openai.chat.completions.create(
      createCareerAnalysis(prompt)
    );

    const functionCall = completion.choices[0].message.function_call;
    if (!functionCall || functionCall.name !== 'career_analysis') {
      throw new Error('Invalid response format from AI model');
    }

    const result = JSON.parse(functionCall.arguments);
    console.log('AI Analysis Result:', JSON.stringify(result));
    
    res.status(200).json({
      next_question: result.next_question || 'Please tell me more about your interests',
      roles: result.roles || [],
      requires_higher_education: result.requires_higher_education || false
    });
  } catch (error) {
    console.error('AI API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: error.message || 'Failed to process request',
      result: 'Unable to generate response. Please try again.'
    });
  }
}