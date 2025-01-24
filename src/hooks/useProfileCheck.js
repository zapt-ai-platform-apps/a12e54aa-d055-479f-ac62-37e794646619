import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export function useProfileCheck() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { count } = await supabase
          .from('user_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        setHasProfile(count > 0);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Profile check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkProfile();
  }, []);

  return { hasProfile, loading };
}