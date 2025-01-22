import { createEvent } from '../supabaseClient';
import supabase from '../supabaseClient';

export async function fetchRoleInfoService(role) {
  const response = await createEvent('chatgpt_request', {
    prompt: `Provide detailed information about the role: ${role}. Respond in JSON format: {
      "description": "role description",
      "requirements": {
        "education": "required education level",
        "skills": ["skill1", "skill2"]
      },
      "requires_higher_education": boolean
    }`,
    response_type: 'json'
  });
  return response;
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