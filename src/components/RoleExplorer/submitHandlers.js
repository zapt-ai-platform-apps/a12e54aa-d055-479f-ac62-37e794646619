import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const handleProfileSubmit = async (formData, setLoading, setError, onComplete) => {
  setLoading(true);
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const subjects = formData.subjectGradePairs.map(pair => pair.subject.trim());
    const predictedGrades = formData.subjectGradePairs.map(pair => pair.grade.trim());

    if (subjects.some(s => !s) || predictedGrades.some(g => !g)) {
      throw new Error('Please fill in all subject and grade fields');
    }

    await supabase.from('user_profiles').upsert({
      user_id: user.id,
      academic_year: formData.academicYear,
      subjects: subjects,
      predicted_grades: predictedGrades,
      location_preference: formData.location,
      country: formData.country,
      skills: formData.skills
    });

    onComplete();
  } catch (err) {
    Sentry.captureException(err);
    setError(err.message || 'Failed to save profile. Please try again.');
    console.error('Profile save error:', err);
  } finally {
    setLoading(false);
  }
};