import React from 'react';
import { FormFields } from "./components/FormFields";
import { SubmitButton } from "./RoleExplorerComponents/Form/SubmitButton";
import { useUserProfileForm } from "./hooks/useUserProfileForm";

export default function UserProfileForm({ onComplete, initialData, keySkills }) {
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{initialData ? "Edit Profile" : "Profile Setup"}</h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFields
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddPair={handleAddPair}
          handlePairChange={handlePairChange}
          handleRemovePair={handleRemovePair}
          handleSkillToggle={handleSkillToggle}
        />

        <SubmitButton loading={loading} />
      </form>
    </div>
  );
}