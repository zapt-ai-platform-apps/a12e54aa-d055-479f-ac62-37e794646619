import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="absolute top-8 right-8">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
}