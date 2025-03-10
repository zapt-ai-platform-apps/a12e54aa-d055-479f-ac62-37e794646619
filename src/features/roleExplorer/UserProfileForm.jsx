import React from 'react';
import { SkillsSection } from './components/SkillsSection';
import { FormField } from './components/FormField';
import { useUserProfileForm } from './hooks/useUserProfileForm';
import { SubjectGradeInput } from './components/SubjectGradeInput';
import { SubmitButton } from './components/SubmitButton';

export default function UserProfileForm({ initialData, keySkills, onComplete, isEditMode }) {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSkillToggle,
    handleAddPair,
    handlePairChange,
    handleRemovePair,
    handleSubmit
  } = useUserProfileForm(onComplete, { ...initialData, skills: keySkills });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEditMode ? 'Edit Profile' : 'Profile Setup'}</h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label="Current Academic Year"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleInputChange}
            placeholder="e.g., Year 12, University Freshman"
            required
            inputClassName="w-full p-2 border rounded-lg box-border"
          />

          <SubjectGradeInput
            pairs={formData.subjectGrades}
            onAdd={handleAddPair}
            onChange={handlePairChange}
            onRemove={handleRemovePair}
          />

          <FormField
            label="Preferred Work Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., London, Remote, Anywhere"
            required
          />

          <FormField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
            required
          />

          <SkillsSection 
            selectedSkills={formData.skills}
            onSkillToggle={handleSkillToggle}
          />
        </div>

        <SubmitButton loading={loading} />
      </form>
    </div>
  );
}