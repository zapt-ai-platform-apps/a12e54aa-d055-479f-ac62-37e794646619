import { useState } from 'react';
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
    subjectGrades: initialData.subjectGrades || []
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
      await handleProfileSubmit(formData, setLoading, setError, onComplete);
    }
  };
};