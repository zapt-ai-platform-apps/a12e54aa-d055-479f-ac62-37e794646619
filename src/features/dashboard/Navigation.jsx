import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../../utils/auth';

export default function Navigation() {
  const navigate = useNavigate();

  const handleSignOutClick = async () => {
    const success = await handleSignOut();
    if (success) {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Develop My Vision</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Profile
          </button>
          <button 
            onClick={handleSignOutClick}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}