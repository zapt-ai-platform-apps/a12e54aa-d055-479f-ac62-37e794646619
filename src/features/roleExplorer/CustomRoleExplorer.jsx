import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sentry from '@sentry/browser';
import CustomRoleExplorerUI from './RoleExplorerComponents/CustomRoleExplorerUI';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRoleData } from '../../hooks/useRoleData';
import { useSaveRole } from '../../hooks/useSaveRole';

export default function CustomRoleExplorer() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('university');

  const { data, loading } = useRoleData(role, setError);
  const handleSave = useSaveRole(data, selectedType, setError, navigate, role);

  if (loading) return <LoadingSpinner />;

  return (
    <CustomRoleExplorerUI
      role={decodeURIComponent(role)}
      data={data}
      error={error}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      handleSave={handleSave}
    />
  );
}