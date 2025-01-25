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
        console.log('Starting dashboard data fetch');
        const { data: { user } } = await supabase.auth.getUser();
        console.log('User ID:', user?.id);

        const [rolesRes, profileRes] = await Promise.all([
          supabase.from('user_roles').select('id').eq('user_id', user.id),
          supabase.from('user_profiles').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
        ]);

        console.log('Roles query results:', rolesRes);
        console.log('Profile query results:', profileRes);

        if (rolesRes.error) throw rolesRes.error;
        if (profileRes.error) throw profileRes.error;

        setSavedRoles(rolesRes.data || []);
        setHasProfile(profileRes.count > 0);
      } catch (error) {
        console.error('Dashboard data error:', error);
        Sentry.captureException(error);
      } finally {
        console.log('Finished dashboard data fetch');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { savedRoles, hasProfile, loading };
}