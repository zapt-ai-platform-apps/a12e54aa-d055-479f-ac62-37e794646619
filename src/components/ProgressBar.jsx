import React from 'react';

export default function ProgressBar({ total, current }) {
  const width = (current / total) * 100;
  
  return (
    <div className="mb-8">
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-600 text-center">
        Step {current} of {total}
      </div>
    </div>
  );
}