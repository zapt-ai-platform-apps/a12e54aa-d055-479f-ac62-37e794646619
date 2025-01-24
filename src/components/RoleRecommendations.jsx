import React from 'react';
import { motion } from 'framer-motion';

export default function RoleRecommendations({ recommendations, onBack, onSave }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-center">Recommended Career Paths</h2>
      
      <div className="grid gap-4">
        {recommendations.map((role, i) => (
          <div 
            key={i}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
            <p className="text-gray-600">{role.description}</p>
            <div className="mt-4 flex gap-2">
              {role.tags.map((tag, j) => (
                <span 
                  key={j}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors"
        >
          Restart Assessment
        </button>
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Save Results
        </button>
      </div>
    </motion.div>
  );
}