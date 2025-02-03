import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useSavedRoles(setError) {
  const [savedRoles, setSavedRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRoles = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('user_roles')
          .select('id, role_title')
          .eq('user_id', user.id);
        if (error) throw error;
        setSavedRoles(data);
      } catch (error) {
        Sentry.captureException(error);
        setError('Failed to load saved roles');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRoles();
  }, [setError]);

  return { savedRoles, loading };
}