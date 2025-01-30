export const fetchCourses = async (session, role) => {
  const response = await fetch(`/api/courses?role=${encodeURIComponent(role)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  return await response.json();
};