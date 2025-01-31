import React from 'react';

export function FeatureCard({ icon, bgColor, textColor, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg mb-4`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${textColor}` })}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}