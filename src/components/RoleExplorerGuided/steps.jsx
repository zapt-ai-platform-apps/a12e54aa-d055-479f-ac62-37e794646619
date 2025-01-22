import React from 'react';

export const IntroductionStep = ({ startGuidedExploration, loading }) => (
  <div className="text-center">
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

export const ConversationStep = ({ messages, input, setInput, loading, handleSubmit }) => (
  <div className="space-y-6">
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${msg.type === 'ai' ? 'bg-blue-50' : 'bg-gray-50'}`}
        >
          <p className="text-gray-800">{msg.content}</p>
        </div>
      ))}
    </div>

    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer here..."
        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  </div>
);

export const ResultsStep = ({ recommendations, setStep }) => (
  <div className="space-y-6">
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