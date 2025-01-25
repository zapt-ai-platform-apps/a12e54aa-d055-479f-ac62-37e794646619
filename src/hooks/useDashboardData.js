import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useDashboardData() {
  const [savedRoles, setSavedRoles] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const [rolesRes, profileRes] = await Promise.all([
          supabase.from('user_roles').select('id').eq('user_id', user.id),
          supabase.from('user_profiles').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
        ]);

        if (rolesRes.error) throw rolesRes.error;
        if (profileRes.error) throw profileRes.error;

        setSavedRoles(rolesRes.data || []);
        setHasProfile(profileRes.count > 0);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Dashboard data error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { savedRoles, hasProfile, loading };
}