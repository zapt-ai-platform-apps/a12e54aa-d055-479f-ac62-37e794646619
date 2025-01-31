import './sentry.js';
import { executeApiWithErrorHandling } from './_apiUtils';
import openai from './openai-client.js';
import { createCareerAnalysis } from '../lib/ai-utils.js';

export default async function handler(req, res) {
  return executeApiWithErrorHandling(async (req, res) => {
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
  }, req, res);
}