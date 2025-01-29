import { initializeZapt } from '@zapt/zapt-js';

export const { createEvent, supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

export async function recordLogin(email) {
  return createEvent('user_login', { email });
}