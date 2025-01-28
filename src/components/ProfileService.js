import { supabase } from '../supabaseClient';

export async function fetchProfileData() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('No access token found');
  }

  console.log('Fetching user profile with token...');
  const response = await fetch('/api/user-profile', {
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch profile');
  }
  
  const data = await response.json();
  console.log('Received profile data:', data);

  return {
    academicYear: data.academic_year || '',
    subjects: Array.isArray(data.subjects) ? data.subjects.join(', ') : '',
    predictedGrades: Array.isArray(data.predicted_grades) ? data.predicted_grades.join(', ') : '',
    location: data.location_preference || '',
    country: data.country || '',
    skills: Array.isArray(data.skills) ? data.skills : []
  };
}