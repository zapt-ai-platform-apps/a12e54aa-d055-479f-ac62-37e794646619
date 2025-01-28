import React from 'react';
import { SkillsSection } from './SkillsSection';
import { FormField } from './FormField';
import { useUserProfileForm } from './useUserProfileForm';
import { AcademicYearDropdown } from './AcademicYearDropdown';
import { SubmitButton } from './SubmitButton';

export default function UserProfileForm({ initialData, onComplete, isEditMode }) {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSkillToggle,
    handleSubmit
  } = useUserProfileForm(onComplete, initialData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEditMode ? 'Edit Profile' : 'Profile Setup'}</h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <AcademicYearDropdown 
            value={formData.academicYear}
            onChange={handleInputChange}
          />

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