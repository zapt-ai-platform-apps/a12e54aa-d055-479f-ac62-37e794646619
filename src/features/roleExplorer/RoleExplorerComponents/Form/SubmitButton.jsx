import React from 'react';

export function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {loading ? 'Saving...' : 'Complete Profile'}
    </button>
  );
}