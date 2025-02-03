import { useState } from 'react';
import { handleProfileSubmit } from '../../../components/RoleExplorer/submitHandlers.js';
import { defaultFormData } from '../../../components/RoleExplorer/Form/constants';

export const useUserProfileForm = (onComplete, initialData) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...initialData,
    subjectGrades: initialData.subjects?.map((subject, index) => ({
      subject,
      grade: initialData.predictedGrades?.[index] || ''
    })) || []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return {
    formData,
    loading,
    error,
    handleInputChange: (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    handleSkillToggle: (skill) => {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.includes(skill)
          ? prev.skills.filter(s => s !== skill)
          : [...prev.skills, skill]
      }));
    },
    handlePairChange: (index, field, value) => {
      setFormData(prev => ({
        ...prev,
        subjectGrades: prev.subjectGrades.map((pair, i) =>
          i === index ? { ...pair, [field]: value } : pair
        )
      }));
    },
    handleAddPair: () => {
      setFormData(prev => ({
        ...prev,
        subjectGrades: [...prev.subjectGrades, { subject: '', grade: '' }]
      }));
    },
    handleRemovePair: (index) => {
      setFormData(prev => ({
        ...prev,
        subjectGrades: prev.subjectGrades.filter((_, i) => i !== index)
      }));
    },
    handleSubmit: async (e) => {
      e.preventDefault();
      
      // Validate at least one subject/grade pair exists
      if (formData.subjectGrades.length === 0) {
        setError('Please add at least one subject and predicted grade');
        return;
      }
      
      // Validate all pairs have both subject and grade
      const incompletePairs = formData.subjectGrades.filter(pair => !pair.subject || !pair.grade);
      if (incompletePairs.length > 0) {
        setError('Please complete all subject and grade fields');
        return;
      }

      await handleProfileSubmit(formData, setLoading, setError, onComplete);
    }
  };
};