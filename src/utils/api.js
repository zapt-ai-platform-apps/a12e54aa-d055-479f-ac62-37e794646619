import { supabase } from '../supabaseClient';

export const saveUserProfile = async (formData, userId) => {
  const { error } = await supabase.from('user_profiles').upsert({
    user_id: userId,
    academic_year: formData.academicYear,
    subjects: formData.subjects.split(',').map(s => s.trim()),
    predicted_grades: formData.predictedGrades.split(',').map(s => s.trim()),
    location_preference: formData.location,
    skills: formData.skills
  });

  if (error) throw error;
};