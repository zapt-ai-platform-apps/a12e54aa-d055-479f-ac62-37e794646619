export const handleInputChange = (name, value, prevFormData) => ({
  ...prevFormData,
  [name]: value
});

export const handleSkillToggle = (skill, prevFormData) => ({
  ...prevFormData,
  skills: prevFormData.skills.includes(skill)
    ? prevFormData.skills.filter(s => s !== skill)
    : [...prevFormData.skills, skill]
});

export const handlePairChange = (index, field, value, prevFormData) => ({
  ...prevFormData,
  subjectGrades: prevFormData.subjectGrades.map((pair, i) => 
    i === index ? { ...pair, [field]: value } : pair
  )
});

export const handleAddPair = (prevFormData) => ({
  ...prevFormData,
  subjectGrades: [...prevFormData.subjectGrades, { subject: '', grade: '' }]
});

export const handleRemovePair = (index, prevFormData) => ({
  ...prevFormData,
  subjectGrades: prevFormData.subjectGrades.filter((_, i) => i !== index)
});