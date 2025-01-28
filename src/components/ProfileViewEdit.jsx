import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileForm from './RoleExplorer/UserProfileForm';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';
import { fetchProfileData } from './ProfileService';

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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileData();
        console.log('Profile data:', data);
        setProfileData({
          academicYear: data.academicYear || '',
          subjects: data.subjects || '', 
          predictedGrades: data.predictedGrades || '',
          location: data.location || '',
          country: data.country || '',
          skills: data.skills || []
        });
        setKeySkills(data.skills || []);
      } catch (error) {
        console.error('Profile fetch error:', error);
        Sentry.captureException(error);
        setError(error.message || 'Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
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
          />
        </div>
      </div>
    </div>
  );
}