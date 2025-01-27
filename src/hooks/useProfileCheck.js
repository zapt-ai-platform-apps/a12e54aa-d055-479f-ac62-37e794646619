import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

export function useProfileCheck() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await fetch('/api/user-profile');
        if (!response.ok) throw new Error('Profile check failed');
        const data = await response.json();
        setHasProfile(data.exists);
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