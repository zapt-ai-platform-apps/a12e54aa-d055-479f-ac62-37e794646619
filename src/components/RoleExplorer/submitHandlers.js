import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const handleProfileSubmit = async (formData, setLoading, setError, onComplete) => {
  setLoading(true);
  
  try {
    const { data: { session } } = await supabase.auth.getUser();
    const subjects = formData.subjectGradePairs.map(pair => pair.subject.trim());
    const predictedGrades = formData.subjectGradePairs.map(pair => pair.grade.trim());

    if (subjects.some(s => !s) || predictedGrades.some(g => !g)) {
      throw new Error('Please fill in all subject and grade fields');
    }

    const response = await fetch('/api/save-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        academicYear: formData.academicYear,
        subjects: subjects,
        predictedGrades: predictedGrades,
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