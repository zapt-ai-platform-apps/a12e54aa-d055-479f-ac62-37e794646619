import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}