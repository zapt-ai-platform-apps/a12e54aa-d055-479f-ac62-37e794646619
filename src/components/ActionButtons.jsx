import React from 'react';

export default function ActionButtons({ onBack, onSave }) {
  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={onBack}
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Back
      </button>
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save to Profile
      </button>
    </div>
  );
}