import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function useJobListings(selectedRole, setError) {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!selectedRole) return;
      
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch(`/api/fetch-jobs?role=${encodeURIComponent(selectedRole)}`, {
          headers: { Authorization: `Bearer ${session?.access_token}` }
        });

        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobListings(data.jobs);
      } catch (error) {
        Sentry.captureException(error);
        setError('Failed to load job listings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [selectedRole, setError]);

  return { jobListings, loading };
}