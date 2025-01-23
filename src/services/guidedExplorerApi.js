import { supabase } from '../supabaseClient';

export const fetchAIResponse = async (prompt, accessToken) => {
  const response = await fetch('/api/ask-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) throw new Error('API request failed');
  return await response.json();
};

export const fetchCourses = async (role, userId) => {
  const response = await fetch(`/api/courses?role=${encodeURIComponent(role)}&userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  const data = await response.json();
  return data.courses;
};

export const saveRole = async (selectedRole, courses, user, academicData) => {
  const { error } = await supabase
    .from('user_roles')
    .insert([{
      user_id: user.id,
      role_title: selectedRole,
      academic_year: academicData.year,
      subjects: academicData.subjects.split(','),
      predicted_grades: academicData.grades.split(','),
      country: academicData.location,
      requires_higher_education: courses.some(c => c.is_higher_education)
    }]);

  if (error) throw error;
};