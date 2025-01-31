import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';

export default function useDashboardData() {
  const [savedRoles, setSavedRoles] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (!rolesResponse.ok) {
          const errorData = await rolesResponse.json();
          throw new Error(errorData.error || 'Failed to fetch roles');
        }

        const rolesData = await rolesResponse.json();
        setSavedRoles(rolesData);

        // Fetch user profile from API
        const profileResponse = await fetch('/api/user-profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const profileData = await profileResponse.json();

        const hasCompleteProfile = profileData.academic_year && 
          profileData.subjects?.length > 0 && 
          profileData.predicted_grades?.length > 0 &&
          profileData.location_preference;
          
        setHasProfile(hasCompleteProfile);
        setError(null);
      } catch (error) {
        console.error('Dashboard data error:', error);
        Sentry.captureException(error);
        setError(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { savedRoles, hasProfile, loading, error };
}