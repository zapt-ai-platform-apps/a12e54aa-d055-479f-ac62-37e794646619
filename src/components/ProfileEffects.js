import { useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { fetchProfileData } from './ProfileService';

export default function useProfileEffects({ setProfileData, setKeySkills, setLoading, setError, setIsNewUser }) {
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        console.log('Loading profile data...');
        const data = await fetchProfileData();
        console.log('Profile data loaded:', data);
        
        if (!data?.academicYear) {
          console.log('No academic year found - marking as new user');
          setIsNewUser(true);
        }

        setProfileData({
          academicYear: data.academicYear || '',
          subjects: data.subjects || [], 
          predictedGrades: data.predictedGrades || [],
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
  }, [setProfileData, setKeySkills, setLoading, setError, setIsNewUser]);
}