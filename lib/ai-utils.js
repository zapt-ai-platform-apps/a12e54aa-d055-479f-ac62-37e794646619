export function createCareerAnalysis(prompt) {
  return {
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
  };
}