import React from 'react';
import { modules } from './data/dashboardModules';
import Navigation from './Navigation';
import ModuleCard from './ModuleCard';
import LoadingSpinner from './LoadingSpinner';
import useDashboardData from '../hooks/useDashboardData';

export default function Dashboard() {
  const { savedRoles, hasProfile, loading } = useDashboardData();

  const updatedModules = modules.map(module => ({
    ...module,
    status: !hasProfile ? 'locked' : 
      module.requiresRole && savedRoles.length === 0 ? 'locked' : 
      'available'
  }));

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