import { useAuth } from '../AuthProvider';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../common/components/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading, sessionChecked } = useAuth();

  if (loading || !sessionChecked) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}