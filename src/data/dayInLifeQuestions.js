export const scenarios = {
  'Software Engineer': [
    {
      time: '09:00 AM',
      scenario: 'Critical production issue reported - users unable to access payment system',
      tasks: [
        'Prioritize issue severity',
        'Coordinate with operations team',
        'Debug server logs'
      ]
    },
    {
      time: '02:00 PM',
      scenario: 'Code review session for new feature implementation',
      tasks: [
        'Evaluate code quality',
        'Identify potential security issues',
        'Provide constructive feedback'
      ]
    }
  ],
  'Data Scientist': [
    {
      time: '10:00 AM',
      scenario: 'Stakeholder meeting to present predictive model results',
      tasks: [
        'Explain technical concepts to non-technical audience',
        'Handle challenging questions about model accuracy',
        'Negotiate timeline for model improvements'
      ]
    },
    {
      time: '03:00 PM',
      scenario: 'Data pipeline optimization challenge',
      tasks: [
        'Identify performance bottlenecks',
        'Propose alternative algorithms',
        'Collaborate with engineering team'
      ]
    }
  ]
};

export const feedbackTemplates = {
  strengths: [
    'Effective problem-solving demonstrated',
    'Clear communication of technical concepts',
    'Strong collaboration skills'
  ],
  improvements: [
    'Consider edge cases in implementation',
    'Improve documentation practices',
    'Enhance error handling'
  ]
};