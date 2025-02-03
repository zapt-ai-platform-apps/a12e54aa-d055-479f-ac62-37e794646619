import { supabase } from '../../supabaseClient';

export async function getSavedRoles() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('user_roles')
    .select('id, role_title')
    .eq('user_id', user.id);
  if (error) throw error;
  return data;
}

export async function fetchChallenges(roleId) {
  const response = await fetch(`/api/niche-challenges?role_id=${roleId}`);
  if (!response.ok) throw new Error('Failed to load challenges');
  const data = await response.json();
  return data;
}

export async function submitChallengeResponse(challengeId, userResponse, selectedRole) {
  const { data: { session } } = await supabase.auth.getSession();
  const response = await fetch('/api/submit-challenge-response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({
      challenge_id: challengeId,
      response: userResponse,
      role_id: selectedRole
    })
  });
  const result = await response.json();
  return result;
}