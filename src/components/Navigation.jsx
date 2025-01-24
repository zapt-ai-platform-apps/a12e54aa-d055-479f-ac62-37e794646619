import React from 'react';
import { handleSignOut } from '../utils/auth';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Develop My Vision</h1>
        <button 
          onClick={handleSignOut}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}