import React from 'react';
import { modules } from './data/dashboardModules';
import Navigation from './Navigation';
import ModuleCard from './ModuleCard';
import LoadingSpinner from './LoadingSpinner';
import useDashboardData from '../hooks/useDashboardData';

export default function Dashboard() {
  const { savedRoles, hasProfile, loading } = useDashboardData();

  const updatedModules = modules.map(module => {
    // Add loading state check
    if (loading) {
      return {
        ...module,
        status: 'loading',
        loadingMessage: 'Loading profile data...'
      };
    }

    const status = !hasProfile ? 'locked' : 
      module.requiresRole && savedRoles.length === 0 ? 'locked' : 
      'available';
    
    let message = '';
    if (status === 'locked') {
      if (!hasProfile) {
        message = 'Complete your profile to unlock this feature';
      } else if (module.requiresRole && savedRoles.length === 0) {
        message = 'Save at least one role to unlock this feature';
      }
    }

    return {
      ...module,
      status,
      message
    };
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Development Modules</h2>
          <p className="text-gray-600">
            Complete modules in sequence to unlock your full career potential
          </p>
        </div>

        {!hasProfile && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-600">
              Please complete your profile setup to access all features
            </p>
          </div>
        )}

        {savedRoles.length === 0 && (
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <p className="text-orange-600">
              Save at least one role from the Role Explorer to unlock additional modules
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {updatedModules.map((module, index) => (
            <ModuleCard 
              key={module.title}
              module={module}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}