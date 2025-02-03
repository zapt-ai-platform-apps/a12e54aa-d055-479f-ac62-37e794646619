import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/components/LoadingSpinner';
import RoleSelector from '../components/RoleSelector';
import JobSections from '../components/JobSections';
import useSavedRoles from '../features/dashboard/useSavedRoles';
import useJobListings from '../features/dashboard/useJobListings';

export default function SkillGapsHub() {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { savedRoles, loading: loadingRoles } = useSavedRoles(setError);
  const { jobListings, loading: loadingJobs } = useJobListings(selectedRole, setError);

  if (loadingRoles) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Close My Skill Gaps Hub</h1>
        
        <RoleSelector 
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          savedRoles={savedRoles}
        />
        
        {selectedRole && (
          <JobSections 
            jobListings={jobListings}
            loadingJobs={loadingJobs}
          />
        )}
      </div>
    </div>
  );
}