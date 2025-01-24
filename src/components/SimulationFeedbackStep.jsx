import React from 'react';

export default function SimulationFeedbackStep({ feedback, courses, onSaveResults, onTryAnother }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Simulation Feedback</h2>
      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2">Strengths &amp; Areas for Improvement</h3>
        <p>{feedback}</p>
      </div>
      
      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2">Recommended Courses</h3>
        <div className="space-y-2">
          {courses.map((course, index) => (
            <a
              key={index}
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-white rounded hover:bg-blue-50"
            >
              <div className="font-medium">{course.name}</div>
              <div className="text-sm text-gray-600">{course.provider}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onTryAnother}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Try Another Role
        </button>
        <button
          onClick={onSaveResults}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Results
        </button>
      </div>
    </div>
  );
}