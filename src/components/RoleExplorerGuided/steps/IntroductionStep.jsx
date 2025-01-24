import React from 'react';
import { Link } from 'react-router-dom';

export const IntroductionStep = ({ startGuidedExploration, loading }) => (
  <div className="text-center">
    <div className="flex justify-between items-center mb-8">
      <Link to="/dashboard" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
        Back to Dashboard
      </Link>
    </div>
    <h1 className="text-3xl font-bold mb-6">Guided Career Discovery</h1>
    <p className="text-gray-600 mb-8">
      Our AI career coach will ask you 5-7 questions to understand your interests, strengths, and aspirations.
    </p>
    <button
      onClick={startGuidedExploration}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      disabled={loading}
    >
      {loading ? 'Starting...' : 'Begin Discovery'}
    </button>
  </div>
);