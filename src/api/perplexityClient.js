import pLimit from 'p-limit';

const limit = pLimit(10);

export async function callPerplexityAPI(prompt, apiKey) {
  return await limit(() => fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'sonar-medium-online',
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  }));
}