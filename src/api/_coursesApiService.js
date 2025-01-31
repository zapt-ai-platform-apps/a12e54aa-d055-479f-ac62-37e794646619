import pLimit from 'p-limit';
import * as Sentry from '@sentry/node';

const limit = pLimit(10);

export async function fetchCoursesFromPerplexity(prompt) {
  const startTime = Date.now();
  
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error('Perplexity API key is missing');
    }

    console.log('Sending request to Perplexity API with prompt:', prompt);

    const response = await limit(() => fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-medium-online',
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    }));

    const duration = Date.now() - startTime;
    console.log(`Perplexity API call took ${duration}ms`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Perplexity API error:', {
        status: response.status,
        error: errorData,
        inputPrompt: prompt
      });
      throw new Error(`Perplexity API request failed with status ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Perplexity API response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from Perplexity API: Missing text content');
    }

    let parsedData;
    try {
      parsedData = JSON.parse(data.choices[0].message.content);
    } catch (err) {
      console.error('JSON parsing error:', err);
      throw new Error('Failed to parse Perplexity API response: Invalid JSON format');
    }

    if (!Array.isArray(parsedData?.courses)) {
      throw new Error('Invalid course data format from Perplexity API: Missing courses array');
    }

    const validCourses = parsedData.courses.filter(course => 
      course.name && course.provider && course.link
    );

    if (validCourses.length === 0) {
      throw new Error('No valid courses found in response');
    }

    return validCourses;
  } catch (error) {
    console.error('Failed to fetch courses from Perplexity:', {
      error: error.message,
      stack: error.stack,
      inputPrompt: prompt
    });
    Sentry.captureException(error);
    throw error;
  }
}