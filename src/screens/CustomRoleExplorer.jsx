import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import LoadingSpinner from '../common/components/LoadingSpinner';
import CustomRoleExplorerUI from '../features/roleExplorer/RoleExplorerComponents/CustomRoleExplorerUI';
import { useRoleData } from '../features/roleExplorer/hooks/useRoleData';
import { useSaveRole } from '../features/roleExplorer/hooks/useSaveRole';

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