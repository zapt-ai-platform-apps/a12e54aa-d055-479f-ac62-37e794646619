import { supabase } from '../supabaseClient';

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    Sentry.captureException(error);
  }
};