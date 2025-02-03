import { supabase } from '../supabaseClient';

export async function fetchSavedRoles() {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('user_roles')
      .select('id, role_title')
      .eq('user_id', user.id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export async function fetchRoleData(selectedRole) {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    const [essentialRes, usefulRes, opportunitiesRes] = await Promise.all([
      fetch(`/api/fetch-essential-courses?role=${encodeURIComponent(selectedRole)}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch(`/api/fetch-useful-courses?role=${encodeURIComponent(selectedRole)}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch(`/api/fetch-work-opportunities?role=${encodeURIComponent(selectedRole)}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);
    const essentialData = await essentialRes.json();
    const usefulData = await usefulRes.json();
    const opportunitiesData = await opportunitiesRes.json();
    return {
      essentialCourses: essentialData.courses,
      freeCourses: usefulData.free,
      paidCourses: usefulData.paid,
      workOpportunities: opportunitiesData.opportunities
    };
  } catch (error) {
    console.error('Error fetching role data:', error);
    return {
      essentialCourses: [],
      freeCourses: [],
      paidCourses: [],
      workOpportunities: []
    };
  }
}