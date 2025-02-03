import { supabase } from '../supabaseClient';

export async function fetchSavedRoles() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('user_roles')
    .select('id, role_title')
    .eq('user_id', user.id);
  return data;
}

export async function submitSimulationResponse(selectedRole) {
  const feedbackText = "Strong problem-solving demonstrated. Consider developing more collaborative approaches.";
  const { data: { session } } = await supabase.auth.getSession();
  const response = await fetch(`/api/courses?role=${encodeURIComponent(selectedRole.role_title)}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    }
  });
  const data = await response.json();
  const fetchedCourses = data.courses.slice(0, 5);
  return { feedback: feedbackText, courses: fetchedCourses };
}

export async function saveSimulationResults(selectedRole, feedback, courses) {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase
    .from('user_specializations')
    .insert([{
      user_id: user.id,
      role_id: selectedRole.id,
      specialization: 'Simulation Results',
      feedback: feedback,
      courses: courses
    }]);
}