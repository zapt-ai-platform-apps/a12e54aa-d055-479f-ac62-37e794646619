import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';
import { defaultFormData } from './constants';

export const useUserProfileForm = (onComplete) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('user_profiles').upsert({
        user_id: user.id,
        academic_year: formData.academicYear,
        subjects: formData.subjects.split(',').map(s => s.trim()),
        predicted_grades: formData.predictedGrades.split(',').map(s => s.trim()),
        location_preference: formData.location,
        skills: formData.skills
      });
      onComplete();
    } catch (err) {
      Sentry.captureException(err);
      setError('Failed to save profile. Please try again.');
      console.error('Profile save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSkillToggle,
    handleSubmit
  };
};