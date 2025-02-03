import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const useSaveRole = (data, selectedType, setError, navigate, role) => {
  const handleSave = async () => {
    if (!data) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const coursesToSave = selectedType === 'university' 
        ? data.universityCourses 
        : data.apprenticeships;

      const { error } = await supabase
        .from('saved_roles')
        .insert([{
          user_id: user.id,
          role: decodeURIComponent(role),
          courses: coursesToSave,
          requirements: selectedType,
          created_at: new Date()
        }]);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      Sentry.captureException(error);
      setError('Failed to save career path');
    }
  };

  return handleSave;
};