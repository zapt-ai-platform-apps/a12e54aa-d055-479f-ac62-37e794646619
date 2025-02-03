import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileForm from "../components/RoleExplorer/UserProfileForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProfileCheck } from '../hooks/useProfileCheck';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { hasProfile, loading } = useProfileCheck();

  if (loading) return <LoadingSpinner />;
  if (hasProfile) navigate('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <UserProfileForm onComplete={() => navigate('/dashboard')} />
        </div>
      </div>
    </div>
  );
}