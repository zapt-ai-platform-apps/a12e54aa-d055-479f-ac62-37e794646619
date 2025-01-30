import { useState, useEffect } from 'react';
import { handleProfileSubmit } from './submitHandlers';
import { 
  handleInputChange as formInputChange,
  handleSkillToggle as formSkillToggle,
  handlePairChange as formPairChange,
  handleAddPair as formAddPair,
  handleRemovePair as formRemovePair
} from './formHandlers';
import { defaultFormData } from './constants';

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
      setFormData(prev => formInputChange(name, value, prev));
    },
    handleSkillToggle: (skill) => {
      setFormData(prev => formSkillToggle(skill, prev));
    },
    handlePairChange: (index, field, value) => {
      setFormData(prev => formPairChange(index, field, value, prev));
    },
    handleAddPair: () => {
      setFormData(prev => formAddPair(prev));
    },
    handleRemovePair: (index) => {
      setFormData(prev => formRemovePair(index, prev));
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