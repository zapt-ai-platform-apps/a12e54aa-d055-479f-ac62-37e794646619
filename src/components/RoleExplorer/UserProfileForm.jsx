import React from 'react';
import { SkillsSection } from './SkillsSection';
import { FormField } from './FormField';
import { useUserProfileForm } from './useUserProfileForm';
import { SubjectGradeInput } from './SubjectGradeInput';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { FormHeader } from './FormHeader';

export default function UserProfileForm({ onComplete }) {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSkillToggle,
    handleSubjectGradeChange,
    handleAddSubjectGrade,
    handleRemoveSubjectGrade,
    handleSubmit
  } = useUserProfileForm(onComplete);

  return (
    <div className="space-y-6">
      <FormHeader 
        onBack={() => navigate('/dashboard')}
        title="Profile Setup"
        description="Let's start with some basic information to personalize your experience."
      />

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
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects and Predicted Grades
            </label>
            <SubjectGradeInput
              pairs={formData.subjectGradePairs}
              onAdd={handleAddSubjectGrade}
              onChange={handleSubjectGradeChange}
              onRemove={handleRemoveSubjectGrade}
            />
          </div>

          <FormField
            label="Country of Exams"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Complete Profile'}
        </Button>
      </form>
    </div>
  );
}