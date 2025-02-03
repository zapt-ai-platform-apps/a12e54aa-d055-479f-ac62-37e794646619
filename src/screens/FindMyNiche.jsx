import React from 'react';
import LoadingSpinner from '../common/components/LoadingSpinner';
import RoleSelection from '../features/roleExplorer/components/RoleSelection';
import ChallengeInteraction from '../features/niche/ChallengeInteraction';
import { useFindMyNiche } from '../features/niche/useFindMyNiche';

export default function FindMyNiche() {
  const {
    savedRoles,
    selectedRole,
    challenges,
    currentChallenge,
    userResponse,
    feedback,
    specializations,
    loading,
    isSubmitting,
    setUserResponse,
    startChallenge,
    handleBack,
    submitResponse,
    handleNextChallenge,
    navigate
  } = useFindMyNiche();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <button
          onClick={selectedRole ? handleBack : () => navigate(-1)}
          className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Find My Niche</h1>
        
        {!selectedRole ? (
          <RoleSelection savedRoles={savedRoles} startChallenge={startChallenge} />
        ) : (
          <ChallengeInteraction
            challenges={challenges}
            currentChallenge={currentChallenge}
            userResponse={userResponse}
            setUserResponse={setUserResponse}
            feedback={feedback}
            specializations={specializations}
            isSubmitting={isSubmitting}
            submitResponse={submitResponse}
            handleNextChallenge={handleNextChallenge}
          />
        )}
      </div>
    </div>
  );
}