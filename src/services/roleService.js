import supabase from '../supabaseClient';

export async function fetchRoleInfoService(role) {
  const response = await fetch(`/api/ask-ai?role=${encodeURIComponent(role)}`);
  const data = await response.json();
  return data;
}

export async function handleSaveRoleService(role, requiresHigherEducation, courses) {
  const { data: { session } } = await supabase.auth.getSession();
  
  await fetch('/api/save-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({
      role,
      requiresHigherEducation,
      courses
    })
  });
}