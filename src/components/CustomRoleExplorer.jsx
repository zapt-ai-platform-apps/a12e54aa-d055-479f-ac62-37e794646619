import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import CustomRoleExplorerUI from './CustomRoleExplorerUI';
import { fetchCourses } from '../api/guidedExploration.js';
import { saveExploration } from '../utils/saveExploration';

export default function CustomRoleExplorer() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const response = await fetchCourses(session, role);
        setCourses(response.courses || []); // Ensure courses is always an array
      } catch (err) {
        console.error('Error:', err);
        Sentry.captureException(err);
        setError('Failed to load course recommendations');
        setCourses([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, [role]);

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('saved_roles')
        .insert([{
          user_id: user.id,
          role: role,
          courses: courses,
          requirements: 'university'
        }]);

      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      console.error('Save error:', err);
      Sentry.captureException(err);
      setError('Failed to save career path');
    }
  };

  return (
    <CustomRoleExplorerUI
      role={role}
      courses={courses}
      loading={loading}
      error={error}
      handleSave={handleSave}
    />
  );
}