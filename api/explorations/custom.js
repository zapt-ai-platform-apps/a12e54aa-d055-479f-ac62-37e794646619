import '../sentry.js';
import * as Sentry from '@sentry/node';
import { authenticateUser } from '../_apiUtils.js';
import { fetchCoursesFromPerplexity } from '../_coursesApiService.js';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const role = decodeURIComponent(req.query.role);
    
    if (!role || role.length > 100) {
      return res.status(400).json({ error: 'Invalid role parameter' });
    }

    const coursesPrompt = `Provide 15 university courses for ${role} with direct enrollment links. 
      Include course name, provider, and URL. Format as JSON: { "courses": [...] }`;
    
    const apprenticeshipPrompt = `Provide 15 apprenticeship programs for ${role} with application links.
      Include program name, provider, and URL. Format as JSON: { "apprenticeships": [...] }`;

    const [universityCourses, apprenticeships] = await Promise.all([
      fetchCoursesFromPerplexity(coursesPrompt),
      fetchCoursesFromPerplexity(apprenticeshipPrompt)
    ]);

    res.status(200).json({
      roleInfo: {
        description: `Career path details for ${role}`,
        requirements: ['Bachelor\'s degree in relevant field', 'Industry certifications']
      },
      universityCourses,
      apprenticeships,
      requiresEducation: universityCourses.length > 0
    });
    
  } catch (error) {
    Sentry.captureException(error);
    console.error('Custom exploration error:', {
      error: error.message,
      query: req.query,
      stack: error.stack
    });
    
    const statusCode = error.message.includes('perplexity') ? 502 : 500;
    res.status(statusCode).json({ 
      error: error.message || 'Failed to generate exploration',
      details: statusCode === 502 ? 'AI service unavailable' : undefined 
    });
  }
}