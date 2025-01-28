import React from 'react';
import { SkillsSection } from './SkillsSection';
import { FormField } from './FormField';
import { useUserProfileForm } from './useUserProfileForm';
import { SubmitButton } from './SubmitButton';
import { FormFields } from './FormFields';

export default function UserProfileForm({ initialData, keySkills, onComplete, isEditMode, showBackButton = true }) {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSkillToggle,
    handleSubmit
  } = useUserProfileForm(onComplete, { ...initialData, skills: keySkills });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEditMode ? 'Edit Profile' : 'Profile Setup'}</h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSkillToggle={handleSkillToggle}
        />

        {showBackButton && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Back
          </button>
        )}

        <SubmitButton loading={loading} />
      </form>
    </div>
  );
}