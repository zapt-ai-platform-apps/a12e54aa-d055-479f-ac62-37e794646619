import { supabase } from '../supabaseClient';

export async function fetchProfileData() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('No access token found');
  }

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

  const academicYear = data.academic_year || '';
  const subjectGrades = data.subject_grades?.map((sg) => ({
    subject: sg.subject,
    grade: sg.grade
  })) || [];
  const location = data.location_preference || '';
  const country = data.country || '';
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return {
    academicYear,
    subjectGrades,
    location,
    country,
    skills
  };
}