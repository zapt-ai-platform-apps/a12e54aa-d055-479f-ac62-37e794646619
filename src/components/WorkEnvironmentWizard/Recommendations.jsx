import React from 'react';
import { motion } from 'framer-motion';

export default function Recommendations({ recommendations, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Recommended Organizations</h2>
      <div className="space-y-4">
        {recommendations.map((org, i) => (
          <div key={i} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">{org.name}</h3>
            <p className="text-gray-600 mt-2">{org.description}</p>
            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Visit Website →
            </a>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/dashboard')}
        className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Finish and Save Preferences
      </button>
    </motion.div>
  );
}