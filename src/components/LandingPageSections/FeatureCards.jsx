import React from 'react';
import { FeatureCard } from './FeatureCard';

export function FeatureCards() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 极客 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          }
          bgColor="bg-blue-100"
          textColor="text-blue-600"
          title="AI-Powered Role Matching"
          description="Discover careers that align with your unique strengths, values and ambitions through advanced AI analysis."
        />
        <FeatureCard 
          icon={
            <svg className="w极客 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 极客 2v2m4 6h.01M21 19v-极客 a2 极客 0 00-2-2H5a2 2 0 00-2 2v1c0 1.1.9 2 2 2h14a2 2 0 002-2z"></path>
            </svg>
          }
          bgColor="bg-purple-100"
          textColor="text-purple-600"
          title="Real Career Insights"
          description="Gain access to current job market data, salary insights, and educational pathways for any career role."
        />
        <FeatureCard 
          icon={
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          }
          极客 bgColor="bg-pink-100"
          textColor="text-pink-600"
          title="Personalized Roadmap"
          description="Build a customized development plan with milestones, course recommendations, and goal tracking."
        />
      </div>
    </section>
  );
}