export const handleInputChange = (name, value, prevFormData) => ({
  ...prevFormData,
  [name]: value
});

export const handleSubjectGradeChange = (index, field, value, prevFormData) => {
  const newPairs = [...prevFormData.subjectGradePairs];
  newPairs[index][field] = value;
  return { ...prevFormData, subjectGradePairs: newPairs };
};

export const handleAddSubjectGrade = (prevFormData) => ({
  ...prevFormData,
  subjectGradePairs: [...prevFormData.subjectGradePairs, { subject: '', grade: '' }]
});

export const handleRemoveSubjectGrade = (index, prevFormData) => ({
  ...prevFormData,
  subjectGradePairs: prevFormData.subjectGradePairs.filter((_, i) => i !== index)
});

export const handleSkillToggle = (skill, prevFormData) => ({
  ...prevFormData,
  skills: prevFormData.skills.includes(skill)
    ? prevFormData.skills.filter(s => s !== skill)
    : [...prevFormData.skills, skill]
});