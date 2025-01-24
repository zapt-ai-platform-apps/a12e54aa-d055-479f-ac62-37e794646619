import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export const calculateRecommendations = async (answers) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify(answers)
    });
    
    const data = await response.json();
    return data.recommendations;
  } catch (error) {
    console.error('Recommendation error:', error);
    Sentry.captureException(error);
    throw error;
  }
};