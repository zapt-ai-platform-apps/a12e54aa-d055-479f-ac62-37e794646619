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
  const { result } = await response.json();
  return result;
};

export const fetchCourses = async (role) => {
  const response = await fetch(`/api/courses?role=${encodeURIComponent(role)}&type=university`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  const data = await response.json();
  return data.courses;
};

export const saveRole = async (selectedRole, courses, user) => {
  const { error } = await supabase
    .from('saved_roles')
    .insert([{
      user_id: user.id,
      role: selectedRole,
      courses: courses,
      requirements: courses.length ? 'university' : 'apprenticeship'
    }]);

  if (error) throw error;
};