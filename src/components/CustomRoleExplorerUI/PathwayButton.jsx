import React from 'react';

export const PathwayButton = ({ type, label, selectedType, onClick }) => (
  <button
    onClick={() => onClick(type)}
    className={`p-3 rounded-lg ${
      selectedType === type
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);