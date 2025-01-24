import React from 'react';

export const ResultsStep = ({ recommendations, setStep }) => (
  <div className="space-y-6">
    <button
      onClick={() => setStep('conversation')}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
    >
      Back to Conversation
    </button>
    <h2 className="text-2xl font-bold">Recommended Career Paths</h2>
    <div className="space-y-4">
      {recommendations.roles.map((role, index) => (
        <div key={index} className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg">{role.title}</h3>
          <p className="text-gray-600">{role.description}</p>
        </div>
      ))}
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Next Steps</h3>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        onClick={() => setStep('courses')}
      >
        View Course Recommendations
      </button>
    </div>
  </div>
);

export const CoursesStep = ({ recommendations, navigate, setStep }) => (
  <div className="space-y-6">
    <button
      onClick={() => setStep('results')}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
    >
      Back to Roles
    </button>
    <h2 className="text-2xl font-bold">Recommended Courses</h2>
    <div className="space-y-4">
      {recommendations.courses.map((course, index) => (
        <div key={index} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <h3 className="font-semibold">{course.provider}</h3>
            <p>{course.title}</p>
          </a>
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-center">
      <button
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        onClick={() => setStep('results')}
      >
        Back to Roles
      </button>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => navigate('/dashboard')}
      >
        Save and Finish
      </button>
    </div>
  </div>
);