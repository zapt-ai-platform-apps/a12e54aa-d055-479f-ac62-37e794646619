import { initializeZapt } from '@zapt/zapt-js';

export const { createEvent, supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

export async function recordLogin(email) {
  try {
    const result = await createEvent('user_login', { email });
    return result;
  } catch (error) {
    console.error('Failed to record login:', error);
    Sentry.captureException(error);
    throw error;
  }
}