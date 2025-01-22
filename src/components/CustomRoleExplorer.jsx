import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import CustomRoleExplorerUI from './CustomRoleExplorerUI';

export default function CustomRoleExplorer() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/courses?role=${encodeURIComponent(role)}&type=university`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        console.error('Error:', err);
        Sentry.captureException(err);
        setError('Failed to load course recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
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