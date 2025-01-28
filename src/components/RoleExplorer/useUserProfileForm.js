import { useState } from 'react';
import { handleProfileSubmit } from './submitHandlers';
import { 
  handleInputChange as formInputChange,
  handleSkillToggle as formSkillToggle
} from './formHandlers';
import { defaultFormData } from './constants';

export const useUserProfileForm = (onComplete, initialData) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...initialData
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
    handleSubmit: async (e) => {
      e.preventDefault();
      await handleProfileSubmit(formData, setLoading, setError, onComplete);
    }
  };
};