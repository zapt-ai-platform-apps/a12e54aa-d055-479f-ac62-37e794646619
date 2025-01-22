import { createEvent } from '../supabaseClient';

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;
    
    const response = await fetch('https://api.perplexity.ai/complete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `As a career coach, respond to this student query: ${prompt}`,
        max_tokens: 500
      })
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}