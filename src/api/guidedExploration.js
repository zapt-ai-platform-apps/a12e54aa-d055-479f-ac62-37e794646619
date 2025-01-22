export const startGuidedExplorationApi = async (session) => {
  const response = await fetch('/api/explorations/guided', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  return await response.json();
};

export const submitResponseApi = async (session, input) => {
  const response = await fetch('/api/explorations/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify({ response: input }),
  });
  return await response.json();
};