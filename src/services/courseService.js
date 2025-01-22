export async function fetchCoursesService(role, isHigherEd) {
  const response = await fetch(`/api/courses?role=${encodeURIComponent(role)}&type=${isHigherEd ? 'university' : 'apprenticeship'}`);
  const data = await response.json();
  return data.courses.slice(0, 15);
}