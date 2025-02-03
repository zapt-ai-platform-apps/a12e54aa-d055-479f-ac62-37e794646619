import React from 'react';
import { modules } from '../components/data/dashboardModules';
import Navigation from '../components/Navigation';
import ModuleCard from '../components/ModuleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useSavedRoles from '../features/dashboard/useSavedRoles';
import useJobListings from '../features/dashboard/useJobListings';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';

export default function ApplicationHub() {
  const [selectedRole, setSelectedRole] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const { savedRoles, loading: loadingRoles } = useSavedRoles(setError);
  const { jobListings, loading: loadingJobs } = useJobListings(selectedRole, setError);

  if (loadingRoles) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Application Development Hub</h1>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a role to explore opportunities:
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">Choose a role</option>
            {savedRoles.map(role => (
              <option key={role.id} value={role.role_title}>
                {role.role_title}
              </option>
            ))}
          </select>
          {savedRoles.length === 0 && (
            <p className="mt-2 text-sm text-red-600">
              Complete the Role Explorer module to unlock this feature
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {selectedRole && (
          <div className="space-y-8">
            <Section 
              title="Current Job Opportunities"
              items={jobListings}
              loading={loadingJobs}
              type="job"
            />
          </div>
        )}
      </div>
    </div>
  );
}