import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const handleProfileSubmit = async (formData, setLoading, setError, onComplete) => {
  setLoading(true);
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No active session');

    const response = await fetch('/api/save-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({
        academicYear: formData.academicYear,
        subjects: formData.subjects.split(',').map(s => s.trim()),
        predictedGrades: formData.predictedGrades.split(',').map(s => s.trim()),
        location: formData.location,
        country: formData.country,
        skills: formData.skills
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save profile');
    }

    onComplete();
  } catch (err) {
    Sentry.captureException(err);
    setError(err.message || 'Failed to save profile. Please try again.');
    console.error('Profile save error:', err);
  } finally {
    setLoading(false);
  }
};