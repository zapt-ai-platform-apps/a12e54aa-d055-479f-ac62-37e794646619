import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileForm from './RoleExplorer/UserProfileForm';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';

export default function ProfileViewEdit() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('No access token found');
        }

        console.log('Fetching user profile with token...');
        const response = await fetch('/api/user-profile', {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        
        // Transform API response to match form field names
        const transformedData = {
          academicYear: data.academic_year || '',
          subjects: data.subjects?.join(', ') || '',
          predictedGrades: data.predicted_grades?.join(', ') || '',
          location: data.location_preference || '',
          country: data.country || '',
          skills: data.skills || []
        };
        
        setProfileData(transformedData);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          <UserProfileForm 
            initialData={profileData} 
            onComplete={() => navigate('/dashboard')} 
            isEditMode={true}
          />
        </div>
      </div>
    </div>
  );
}