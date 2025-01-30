import React from 'react';

export const SaveButton = ({ handleSave, selectedType, courses }) => (
  <button
    onClick={handleSave}
    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
    disabled={courses.length === 0}
  >
    Save {selectedType === 'university' ? 'University' : 'Apprenticeship'} Pathway
  </button>
);