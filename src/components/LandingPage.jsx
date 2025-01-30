import React from 'react';
import { NavigationBar } from './LandingPageSections/NavigationBar';
import { HeroSection } from './LandingPageSections/HeroSection';
import { FeatureCards } from './LandingPageSections/FeatureCards';
import { Footer } from './LandingPageSections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      <NavigationBar />
      <HeroSection />
      <FeatureCards />
      <Footer />
    </div>
  );
}