import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ActionButtons({ onBack, onSave }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <button
        onClick={onBack}
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
      >
        Back
      </button>
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Save
      </button>
    </div>
  );
}