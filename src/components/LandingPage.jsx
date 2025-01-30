import React from 'react';
import { NavigationBar } from './LandingPageSections/NavigationBar';
import { HeroSection } from './LandingPageSections/HeroSection';
import { FeatureCards } from './LandingPageSections/FeatureCards';
import { Footer } from './LandingPageSections/Footer';
import ZaptBadge from './ZaptBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavigationBar />
      <HeroSection />
      <div className="relative">
        <ZaptBadge />
        <FeatureCards />
      </div>
      <Footer />
    </div>
  );
}