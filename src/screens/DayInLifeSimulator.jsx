import React from 'react';
import LoadingSpinner from '../common/components/LoadingSpinner';
import RoleSelectionStep from '../components/RoleSelectionStep';
import ScenarioStep from '../components/ScenarioStep';
import SimulationFeedbackStep from '../components/SimulationFeedbackStep';
import { scenarios } from '../data/dayInLifeQuestions';
import useDayInLifeSimulator from '../hooks/useDayInLifeSimulator';

export default function DayInLifeSimulator() {
  const {
    currentStep,
    savedRoles,
    selectedRole,
    responses,
    setResponses,
    courses,
    feedback,
    loading,
    isSubmitting,
    handleRoleSelect,
    handleResponseSubmit,
    handleSaveResults,
    setCurrentStep,
  } = useDayInLifeSimulator();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {currentStep === 0 && (
          <RoleSelectionStep 
            savedRoles={savedRoles} 
            onRoleSelect={handleRoleSelect} 
          />
        )}

        {currentStep === 1 && selectedRole && (
          <ScenarioStep
            selectedRole={selectedRole}
            responses={responses}
            setResponses={setResponses}
            isSubmitting={isSubmitting}
            onSubmit={handleResponseSubmit}
            scenarios={scenarios[selectedRole.role_title] || []}
          />
        )}

        {currentStep === 2 && (
          <SimulationFeedbackStep
            feedback={feedback}
            courses={courses}
            onSaveResults={handleSaveResults}
            onTryAnother={() => setCurrentStep(0)}
          />
        )}
      </div>
    </div>
  );
}