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