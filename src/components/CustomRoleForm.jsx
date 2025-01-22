import React from 'react';

export function CustomRoleForm({ onSubmit, value, onChange }) {
  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Explore Specific Role</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter a role (e.g., 'Software Engineer', 'Environmental Scientist')"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore This Role
        </button>
      </form>
    </div>
  );
}