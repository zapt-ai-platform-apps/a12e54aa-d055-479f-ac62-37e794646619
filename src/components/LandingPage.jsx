import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationBar } from './LandingPageSections/NavigationBar';
import { HeroSection } from './LandingPageSections/HeroSection';
import { FeatureCards } from './LandingPageSections/FeatureCards';
import { Footer } from './LandingPageSections/Footer';
import ZaptBadge from './ZaptBadge';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 1.5 } }} 
      className="min-h-screen bg-gradient-to-b from-white to-blue-50"
    >
      <NavigationBar />
      <HeroSection />
      <div className="relative">
        <ZaptBadge />
        <FeatureCards />
        <div className="container mx-auto px-6 pb-16 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Journey
          </motion.button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}