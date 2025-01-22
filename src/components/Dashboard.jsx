import React from 'react';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../utils/auth';
import { modules } from './data/dashboardModules';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600">Develop My Vision</h1>
          <button 
            onClick={handleSignOut}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Development Modules</h2>
          <p className="text-gray-600">
            Complete modules in sequence to unlock your full career potential
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((module, index) => (
            <div 
              key={module.title}
              className={`p-6 rounded-xl ${module.status === 'available' ? 'bg-white hover:shadow-lg transition-shadow' : 'bg-gray-50 opacity-75'}`}
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-lg p-3">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  {module.status === 'available' ? (
                    <Link 
                      to={module.path}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Start Module
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-sm">Available after completing previous modules</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}