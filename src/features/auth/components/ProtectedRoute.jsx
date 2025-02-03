import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function ProtectedRoute({ children }) {
  const { user, loading, sessionChecked } = useAuth();

  if (loading || !sessionChecked) return <LoadingSpinner />;
  
  if (!user) {
    Sentry.captureException(new Error('Unauthorized access attempt'));
    return <Navigate to="/login" replace />;
  }

  return children;
}