import React from 'react';
import { NavigationBar } from './LandingPageSections/NavigationBar';
import { HeroSection } from './LandingPageSections/HeroSection';
import { FeatureCards } from './LandingPageSections/FeatureCards';
import { Footer } from './LandingPageSections/Footer';
import ZaptBadge from './ZaptBadge';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavigationBar />
      <HeroSection />
      <div className="relative">
        <ZaptBadge />
        <FeatureCards />
        <div className="container mx-auto px-6 pb-16 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Journey
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}