import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function fetchUserSavedRoles() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('user_roles')
      .select('id, role_title')
      .eq('user_id', user.id);
    return data || [];
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error fetching roles:', error);
    return [];
  }
}

export async function fetchCoursesForRole(selectedRole) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`/api/courses?role=${encodeURIComponent(selectedRole.role_title)}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    const data = await response.json();
    return data.courses.slice(0, 5);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function saveUserSpecialization(selectedRole, feedback, courses) {
  try {
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
  } catch (error) {
    Sentry.captureException(error);
    console.error('Save error:', error);
    throw error;
  }
}