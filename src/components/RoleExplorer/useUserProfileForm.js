import { useState } from 'react';
import { handleProfileSubmit } from './submitHandlers';
import { 
  handleInputChange as formInputChange,
  handleSubjectGradeChange as formSubjectGradeChange,
  handleAddSubjectGrade as formAddSubjectGrade,
  handleRemoveSubjectGrade as formRemoveSubjectGrade,
  handleSkillToggle as formSkillToggle
} from './formHandlers';
import { defaultFormData } from './constants';

export const useUserProfileForm = (onComplete) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    subjectGradePairs: [{ subject: '', grade: '' }],
    country: '',
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
    handleSubjectGradeChange: (index, field, value) => {
      setFormData(prev => formSubjectGradeChange(index, field, value, prev));
    },
    handleAddSubjectGrade: () => {
      setFormData(prev => formAddSubjectGrade(prev));
    },
    handleRemoveSubjectGrade: (index) => {
      setFormData(prev => formRemoveSubjectGrade(index, prev));
    },
    handleSubmit: async (e) => {
      e.preventDefault();
      await handleProfileSubmit(formData, setLoading, setError, onComplete);
    }
  };
};