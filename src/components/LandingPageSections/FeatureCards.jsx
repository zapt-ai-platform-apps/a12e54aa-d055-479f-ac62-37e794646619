import React from 'react';
import { FeatureCard } from './FeatureCard';

export function FeatureCards() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v1a3 3 0 00-1.5 2.5v1a3 3 0 003 3h1a3 3 0 002.5-1.5h1a3 3 0 003 3h1a3 3 0 003-3v-1A3 3 0 0016 9V8a6 6 0 00-6-6z" />
            </svg>
          }
          bgColor="bg-blue-100"
          textColor="text-blue-600"
          title="AI-Powered Role Matching"
          description="Discover careers that align with your unique strengths, values and ambitions through advanced AI analysis."
        />
        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3h2v14H3V3zm6 4h2v10H9V7zm6-2h2v12h-2V5z" />
            </svg>
          }
          bgColor="bg-purple-100"
          textColor="text-purple-600"
          title="Real Career Insights"
          description="Gain access to current job market data, salary insights, and educational pathways for any career role."
        />
        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 3.293a1 1 0 00-1.414 0L3 9.586V17a1 1 0 001 1h5v-4a1 1 0 011-1h4V4a1 1 0 00-.293-.707z" />
            </svg>
          }
          bgColor="bg-pink-100"
          textColor="text-pink-600"
          title="Personalized Roadmap"
          description="Build a customized development plan with milestones, course recommendations, and goal tracking."
        />
      </div>
    </section>
  );
}