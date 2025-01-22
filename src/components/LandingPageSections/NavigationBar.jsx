import React from 'react';
import { Link } from 'react-router-dom';

export function NavigationBar() {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">VisionPath</div>
      <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Get Started
      </Link>
    </nav>
  );
}