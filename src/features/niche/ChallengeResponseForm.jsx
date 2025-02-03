import React from 'react';

function ChallengeResponseForm({ userResponse, setUserResponse, isSubmitting, submitResponse }) {
  return (
    <>
      <textarea
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        placeholder="Type your response here..."
        className="w-full p-3 border rounded-lg min-h-[150px]"
        disabled={isSubmitting}
      />
      <button
        onClick={submitResponse}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={isSubmitting || !userResponse.trim()}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Response'}
      </button>
    </>
  );
}

export default ChallengeResponseForm;