import React from 'react';

export function GuidedSection({ onStart }) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Guided Career Discovery</h2>
      <p className="text-gray-600 mb-4">
        Our AI coach will ask you a series of questions to identify roles that match 
        your skills, interests, and values.
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Guided Discovery
      </button>
    </div>
  );
}