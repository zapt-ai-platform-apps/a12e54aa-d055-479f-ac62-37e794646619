import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';

export function useProfileCheck() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          // If no session is found, user might be logged out, handle accordingly
          setHasProfile(false);
          setLoading(false);
          return;
        }

        console.log('Checking user profile existence with token...');
        const response = await fetch('/api/user-profile', {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        
        if (!response.ok) throw new Error('Profile check failed');
        const data = await response.json();
        setHasProfile(!!data.exists);
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