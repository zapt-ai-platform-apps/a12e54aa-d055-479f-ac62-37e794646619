import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function ProtectedRoute({ children }) {
  const { user, loading, sessionChecked } = useAuth();

  if (loading || !sessionChecked) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}