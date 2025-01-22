import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function saveExploration(role, requiresEducation, courses, navigate) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    await fetch('/api/explorations/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        roleTitle: role,
        requiresEducation,
        courses: courses.map(c => ({
          provider: c.provider_name,
          title: c.course_title,
          url: c.course_url
        }))
      }),
    });

    navigate('/dashboard');
  } catch (error) {
    console.error('Error saving exploration:', error);
    Sentry.captureException(error);
    throw error;
  }
}