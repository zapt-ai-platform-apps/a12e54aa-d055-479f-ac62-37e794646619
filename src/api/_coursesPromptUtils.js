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