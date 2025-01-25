import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import * as Sentry from '@sentry/browser';
import { defaultFormData } from './constants';
import { SkillsSection } from './SkillsSection';
import { FormField } from './FormField';
import { saveUserProfile } from '../../utils/api';

export default function UserProfileForm({ onComplete }) {
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
      await saveUserProfile(formData, user.id);
      onComplete();
    } catch (err) {
      Sentry.captureException(err);
      setError('Failed to save profile. Please try again.');
      console.error('Profile save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Setup</h2>
      <p className="text-gray-600 mb-6">
        Let's start with some basic information to personalize your experience.
      </p>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Academic Year
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg bg-white"
              required
            >
              <option value="">Select academic year</option>
              <option value="Year 12">Year 12</option>
              <option value="Year 13">Year 13</option>
              <option value="Gap Year">Gap Year</option>
              <option value="University Freshman">University Freshman</option>
            </select>
          </div>

          <FormField
            label="Main Subjects (comma separated)"
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
            placeholder="e.g., Mathematics, Physics, English"
            required
          />

          <FormField
            label="Predicted Grades (comma separated)"
            name="predictedGrades"
            value={formData.predictedGrades}
            onChange={handleInputChange}
            placeholder="e.g., A, B+, A*"
            required
          />

          <FormField
            label="Preferred Work Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., London, Remote, Anywhere"
            required
          />

          <SkillsSection 
            selectedSkills={formData.skills}
            onSkillToggle={handleSkillToggle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Saving...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  );
}