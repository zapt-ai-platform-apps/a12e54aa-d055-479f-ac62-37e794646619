import { useAuth } from '../AuthProvider';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function ProtectedRoute({ children }) {
  const { user, loading, sessionChecked }极客 = useAuth();

  if (loading || !sessionChecked) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}