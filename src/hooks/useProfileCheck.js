import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';

export function useProfileCheck() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
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
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Profile check failed');
        }
        
        const data = await response.json();
        console.log('Profile existence check result:', data);
        setHasProfile(!!data.exists);
      } catch (error) {
        console.error('Profile check error:', error);
        Sentry.captureException(error);
        setError(error.message || 'Failed to check profile');
      } finally {
        setLoading(false);
      }
    };
    
    checkProfile();
  }, []);

  return { hasProfile, loading, error };
}