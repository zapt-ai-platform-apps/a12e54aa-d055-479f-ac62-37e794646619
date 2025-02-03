import { useState } from "react";
import { handleProfileSubmit } from "../../components/RoleExplorer/submitHandlers.jsx";
import { 
  handleInputChange,
  handleSkillToggle,
  handlePairChange,
  handleAddPair,
  handleRemovePair
} from "../components/Form/FormHandlers";
import { defaultFormData } from "../components/Form/constants";

export const useUserProfileForm = (onComplete, initialData) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...initialData,
    subjectGrades:
      initialData.subjects?.map((subject, index) => ({
        subject,
        grade: initialData.predictedGrades?.[index] || ""
      })) || []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return {
    formData,
    loading,
    error,
    handleInputChange: (e) => {
      const { name, value } = e.target;
      setFormData((prev) => handleInputChange(name, value, prev));
    },
    handleSkillToggle: (skill) => {
      setFormData((prev) => handleSkillToggle(skill, prev));
    },
    handlePairChange: (index, field, value) => {
      setFormData((prev) => handlePairChange(index, field, value, prev));
    },
    handleAddPair: () => {
      setFormData((prev) => handleAddPair(prev));
    },
    handleRemovePair: (index) => {
      setFormData((prev) => handleRemovePair(index, prev));
    },
    handleSubmit: async (e) => {
      e.preventDefault();
      if (formData.subjectGrades.length === 0) {
        setError("Please add at least one subject and predicted grade");
        return;
      }
      const incompletePairs = formData.subjectGrades.filter(
        (pair) => !pair.subject || !pair.grade
      );
      if (incompletePairs.length > 0) {
        setError("Please complete all subject and grade fields");
        return;
      }
      await handleProfileSubmit(formData, setLoading, setError, onComplete);
    }
  };
};