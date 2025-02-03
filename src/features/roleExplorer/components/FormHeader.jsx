import React from 'react';

export function FormHeader({ onBack, title, description }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to Dashboard
        </button>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
    </>
  );
}