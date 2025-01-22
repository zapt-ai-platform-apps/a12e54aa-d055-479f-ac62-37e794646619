import React from 'react';

export default function CustomRoleExplorerUI({ role, courses, loading, error, handleSave }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Exploring: {decodeURIComponent(role)}</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended University Courses</h3>
              <div className="space-y-3">
                {courses.map((course, i) => (
                  <a
                    key={i}
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-600">{course.provider}</div>
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save This Career Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}