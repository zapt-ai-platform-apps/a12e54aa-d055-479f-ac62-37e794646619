import { FormField } from './FormField';
import { SkillsSection } from './SkillsSection';

export function FormFields({ formData, handleInputChange, handleSkillToggle }) {
  return (
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
  );
}