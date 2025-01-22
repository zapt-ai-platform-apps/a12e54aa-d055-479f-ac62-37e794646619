import React from 'react';

export default function SuggestedRolesList({ suggestedRoles, handleRoleSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Suggested Roles:</h2>
      {suggestedRoles.map((role, index) => (
        <button
          key={index}
          onClick={() => handleRoleSelect(role)}
          className="w-full p-4 text-left bg-white border rounded-lg hover:bg-blue-50 transition-colors"
        >
          {role}
        </button>
      ))}
    </div>
  );
}