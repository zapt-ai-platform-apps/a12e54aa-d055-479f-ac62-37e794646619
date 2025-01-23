import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGuidedExplorer from './useGuidedExplorer';
import AcademicForm from './AcademicForm';

export default function GuidedExplorer() {
  const navigate = useNavigate();
  const {
    messages,
    input,
    loading,
    roleSuggestions,
    selectedRole,
    courses,
    academicData,
    handleSubmit,
    handleRoleSelect,
    handleAcademicChange,
    handleSaveRole,
    setInput
  } = useGuidedExplorer(navigate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Guided Career Discovery</h1>
        
        <div className="space-y-4 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-lg ${msg.isUser ? 'bg-blue-50 ml-6' : 'bg-gray-50'}`}>
              <p className={msg.isUser ? 'text-blue-600' : 'text-gray-600'}>{msg.content}</p>
            </div>
          ))}
          {loading && <div className="p-4 bg-gray-50 rounded-lg animate-pulse">Analyzing response...</div>}
        </div>

        {roleSuggestions.length > 0 && !selectedRole && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Roles:</h3>
            <div className="grid gap-3">
              {roleSuggestions.map((role, i) => (
                <button
                  key={i}
                  onClick={() => handleRoleSelect(role)}
                  className="p-3 text-left bg-white border rounded-lg hover:border-blue-500 transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Courses:</h3>
            <div className="space-y-3">
              {courses.map((course, i) => (
                <a
                  key={i}
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-gray-600">{course.provider}</div>
                </a>
              ))}
            </div>
            <AcademicForm
              academicData={academicData}
              handleAcademicChange={handleAcademicChange}
              handleSaveRole={handleSaveRole}
            />
          </div>
        )}

        {!selectedRole && (
          <form onSubmit={handleSubmit} className="border-t pt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Submit Answer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}