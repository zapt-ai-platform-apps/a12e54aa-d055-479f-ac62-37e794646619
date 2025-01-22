import React from 'react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <header className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Shape Your Future with AI-Powered Career Guidance
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover your ideal career path through personalized AI coaching, real-world insights, and actionable steps tailored for students.
      </p>
      <Link 
        to="/login" 
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
      >
        Start Your Journey
      </Link>
    </header>
  );
}