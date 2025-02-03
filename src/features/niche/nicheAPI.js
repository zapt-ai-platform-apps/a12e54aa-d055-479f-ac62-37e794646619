export async function getSavedRoles() {
  // Simulate fetching saved roles from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Frontend Developer' },
        { id: 2, name: 'Backend Developer' },
        { id: 3, name: 'Full Stack Developer' }
      ]);
    }, 500);
  });
}

export async function fetchChallenges(roleId) {
  // Simulate fetching challenges based on the roleId from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        challenges: [
          { id: 101, question: 'How would you build a responsive layout?' },
          { id: 102, question: 'Explain the concept of closures in JavaScript.' },
          { id: 103, question: 'How do you manage state in a complex application?' }
        ]
      });
    }, 500);
  });
}

export async function submitChallengeResponse(challengeId, response, roleId) {
  // Simulate submitting a challenge response to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        feedback: 'Your answer has been received and is under review.',
        specializations: roleId === 1 ? ['CSS', 'Responsive Design'] :
                         roleId === 2 ? ['Node.js', 'Database Management'] :
                         ['React', 'Node.js']
      });
    }, 500);
  });
}