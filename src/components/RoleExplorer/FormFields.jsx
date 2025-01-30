import { FormField } from './FormField';
import { SubjectGradeInput } from './SubjectGradeInput';
import { SkillsSection } from './SkillsSection';

export function FormFields({ 
  formData,
  handleInputChange,
  handleAddPair,
  handlePairChange,
  handleRemovePair,
  handleSkillToggle
}) {
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
  );
}