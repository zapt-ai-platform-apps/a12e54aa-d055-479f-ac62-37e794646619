import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export const useRoleData = (role, setError) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const encodedRole = encodeURIComponent(role);
        
        const response = await fetch(`/api/explorations/custom/${encodedRole}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error: ${errorText}`);
        }

        const result = await response.json();
        
        if (!result.roleInfo || !result.universityCourses) {
          throw new Error('Invalid API response structure');
        }

        setData(result);
        setError('');
      } catch (error) {
        console.error('Error:', error);
        Sentry.captureException(error);
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role, setError]);

  return { data, loading };
};