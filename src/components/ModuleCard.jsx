import React from 'react';
import { Link } from 'react-router-dom';

export default function ModuleCard({ module, index }) {
  const getStatusContent = () => {
    if (module.status === 'loading') {
      return (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      );
    }

    if (module.status === 'locked') {
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{module.message}</p>
          {(!module.requiresRole || module.title === 'Role Explorer') && (
            <Link 
              to="/profile"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Setup Profile
            </Link>
          )}
        </div>
      );
    }

    return (
      <Link 
        to={module.path}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Start Module
      </Link>
    );
  };

  return (
    <div className={`p-6 rounded-xl ${module.status === 'available' ? 'bg-white hover:shadow-lg transition-shadow' : 'bg-gray-50 opacity-75'}`}>
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 text-blue-600 rounded-lg p-3">
          <span className="text-lg font-bold">{index + 1}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{module.description}</p>
          {getStatusContent()}
        </div>
      </div>
    </div>
  );
}