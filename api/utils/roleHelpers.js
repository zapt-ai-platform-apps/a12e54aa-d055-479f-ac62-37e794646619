export function getRoleDescription(title) {
  const descriptions = {
    'Data Scientist': 'Analyze complex datasets to drive business decisions',
    'UI/UX Designer': 'Create intuitive user experiences for digital products',
    'Environmental Scientist': 'Research and solve environmental problems',
    'Software Engineer': 'Develop and maintain software systems',
    'Project Manager': 'Lead teams to deliver successful projects'
  };
  return descriptions[title] || 'Promising career path matching your interests';
}

export function getRoleTags(title) {
  const tags = {
    'Data Scientist': ['Analytical', 'Tech', 'Research'],
    'UI/UX Designer': ['Creative', 'Tech', 'Design'],
    'Environmental Scientist': ['Outdoor', 'Science', 'Research'],
    'Software Engineer': ['Technical', 'Problem Solving', 'Development'],
    'Project Manager': ['Leadership', 'Organization', 'Communication']
  };
  return tags[title] || ['Career', 'Opportunity'];
}