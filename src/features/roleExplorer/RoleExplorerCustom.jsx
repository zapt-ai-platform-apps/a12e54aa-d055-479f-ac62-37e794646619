import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sentry from '@sentry/browser';
import { supabase } from '../../supabaseClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoleContent from './RoleExplorerComponents/RoleContent';
import { saveExploration } from '../../utils/saveExploration';
import { useRoleData } from '../../hooks/useRoleData';

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
        const encodedRole = encodeURIComponent(role);

        const response = await fetch(`/api/explorations/custom/${encodedRole}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch role data');
        }

        const data = await response.json();

        if (!data.roleInfo || !data.universityCourses) {
          throw new Error('Invalid API response structure');
        }

        setRoleInfo(data.roleInfo);
        setCourses(data.courses);
        setRequiresEducation(data.requiresEducation);
      } catch (error) {
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
      // Error handling in saveExploration
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <RoleContent
      role={decodeURIComponent(role)}
      roleInfo={roleInfo}
      courses={courses}
      requiresEducation={requiresEducation}
      onSave={handleSave}
      onBack={() => navigate(-1)}
    />
  );
}