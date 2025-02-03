import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChallengeFeedback({ feedback, specializations, handleNextChallenge }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2">Feedback</h3>
        <p>{feedback}</p>
      </div>
      {specializations.length > 0 && (
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Suggested Specializations</h3>
          <div className="space-y-2">
            {specializations.map((spec, i) => (
              <div key={i} className="p-2 bg-white rounded">
                {spec}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleNextChallenge}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Next Challenge
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Finish Exploration
        </button>
      </div>
    </div>
  );
}

export default ChallengeFeedback;