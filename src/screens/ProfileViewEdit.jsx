import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileForm from "../components/RoleExplorer/UserProfileForm";
import LoadingSpinner from "../components/LoadingSpinner";
import * as Sentry from '@sentry/browser';
import { fetchProfileData } from "../components/ProfileService";
import useProfileEffects from "../components/ProfileEffects";

export default function ProfileViewEdit() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    academicYear: '',
    subjects: '',
    predictedGrades: '',
    location: '',
    country: '',
    skills: []
  });
  const [keySkills, setKeySkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  useProfileEffects({ setProfileData, setKeySkills, setLoading, setError, setIsNewUser });

  const handleSubjectGradeUpdate = (updatedPairs) => {
    setProfileData(prev => ({
      ...prev,
      subjects: updatedPairs.map(pair => pair.subject),
      predictedGrades: updatedPairs.map(pair => pair.grade)
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          {isNewUser && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-600">Welcome! Please complete your profile to get started.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          <UserProfileForm 
            initialData={profileData} 
            keySkills={keySkills}
            onComplete={() => navigate('/dashboard')} 
            isEditMode={true}
            showBackButton={!isNewUser}
            onSubjectGradeUpdate={handleSubjectGradeUpdate}
          />
        </div>
      </div>
    </div>
  );
}