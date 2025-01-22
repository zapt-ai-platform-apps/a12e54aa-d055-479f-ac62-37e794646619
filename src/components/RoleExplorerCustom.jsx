import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import LoadingSpinner from './LoadingSpinner';
import RoleContent from './RoleContent';
import { saveExploration } from '../utils/saveExploration';

export default function RoleExplorerCustom() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [requiresEducation, setRequiresEducation] = useState(null);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch(`/api/explorations/custom/${encodeURIComponent(role)}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const data = await response.json();
        setRoleInfo(data.roleInfo);
        setCourses(data.courses);
        setRequiresEducation(data.requiresEducation);
      } catch (error) {
        console.error('Error fetching role data:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [role]);

  const handleSave = async () => {
    try {
      await saveExploration(role, requiresEducation, courses, navigate);
    } catch (error) {
      // Error handling is done in saveExploration
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <RoleContent
      role={role}
      roleInfo={roleInfo}
      courses={courses}
      requiresEducation={requiresEducation}
      onSave={handleSave}
      onBack={() => navigate(-1)}
    />
  );
}