import React from 'react';

export function FeatureCards() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Role Exploration</h3>
          <p className="text-gray-600">Discover careers that match your unique strengths and interests through AI analysis</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Real-World Insights</h3>
          <p className="text-gray-600">Access current job market data and educational requirements for any role</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
          <p className="text-gray-600">Monitor your career development journey with interactive milestones</p>
        </div>
      </div>
    </section>
  );
}