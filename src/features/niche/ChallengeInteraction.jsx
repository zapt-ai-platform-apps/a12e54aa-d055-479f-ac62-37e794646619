import React from 'react';
import ChallengeResponseForm from './ChallengeResponseForm';
import ChallengeFeedback from './ChallengeFeedback';

function ChallengeInteraction({
  challenges,
  currentChallenge,
  userResponse,
  setUserResponse,
  feedback,
  specializations,
  isSubmitting,
  submitResponse,
  handleNextChallenge
}) {
  return (
    <div className="space-y-6">
      {currentChallenge && (
        <>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              Challenge #{challenges.indexOf(currentChallenge) + 1}
            </h3>
            <p>{currentChallenge.prompt}</p>
          </div>
          {!feedback ? (
            <ChallengeResponseForm
              userResponse={userResponse}
              setUserResponse={setUserResponse}
              isSubmitting={isSubmitting}
              submitResponse={submitResponse}
            />
          ) : (
            <ChallengeFeedback
              feedback={feedback}
              specializations={specializations}
              handleNextChallenge={handleNextChallenge}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ChallengeInteraction;