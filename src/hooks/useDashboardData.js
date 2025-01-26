import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';

export default function useDashboardData() {
  const [savedRoles, setSavedRoles] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error('No active session');
        }

        // Fetch user roles from API
        const rolesResponse = await fetch('/api/user-roles', {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        if (!rolesResponse.ok) throw new Error('Failed to fetch roles');
        const rolesData = await rolesResponse.json();
        setSavedRoles(rolesData);

        // Check profile existence from API
        const profileResponse = await fetch('/api/user-profile', {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        if (!profileResponse.ok) throw new Error('Failed to check profile');
        const profileData = await profileResponse.json();
        setHasProfile(profileData.exists);
      } catch (error) {
        console.error('Dashboard data error:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { savedRoles, hasProfile, loading };
}