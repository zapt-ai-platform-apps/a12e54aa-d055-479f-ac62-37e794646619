export function generatePrompt(userProfile, role) {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error('Perplexity API key is missing');
  }

  return `
    Generate 15 courses for ${role} considering these factors:
    - Academic Year: ${userProfile?.academic_year || 'Not specified'}
    - Subjects: ${userProfile?.subjects?.join(', ') || 'Not specified'}
    - Predicted Grades: ${userProfile?.predicted_grades?.join(', ') || 'Not specified'}
    - Location: ${userProfile?.country || 'Any'}
    Respond in JSON format with an array of courses. Each course should have:
    - name: string
    - provider: string
    - link: string
    - is_higher_education: boolean
  `;
}

export async function fetchCoursesFromPerplexity(prompt) {
  const startTime = Date.now();
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'sonar-medium-online',
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  const duration = Date.now() - startTime;
  console.log(`Perplexity API call took ${duration}ms`);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Perplexity API error:', {
      status: response.status,
      error: errorData
    });
    throw new Error(`Perplexity API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log('Perplexity API response:', data);

  // Validate and parse the response
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response format from Perplexity API');
  }

  let parsedData;
  try {
    parsedData = JSON.parse(data.choices[0].message.content);
  } catch (e) {
    console.error('JSON parsing error:', e);
    throw new Error('Failed to parse Perplexity API response');
  }

  // Validate the course data structure
  if (!Array.isArray(parsedData?.courses)) {
    throw new Error('Invalid course data format from Perplexity API');
  }

  // Validate individual course objects
  const validCourses = parsedData.courses.filter(course => 
    course.name && course.provider && course.link
  );

  if (validCourses.length === 0) {
    throw new Error('No valid courses found in response');
  }

  return validCourses;
}