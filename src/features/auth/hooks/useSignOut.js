import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const useSignOut = () => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
      return false;
    }
  };

  return handleSignOut;
};