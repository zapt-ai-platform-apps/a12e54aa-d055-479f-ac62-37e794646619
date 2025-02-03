import React from 'react';

export default function RoleSelectionStep({ savedRoles, onRoleSelect }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Select a Role to Simulate</h1>
      <div className="grid gap-4">
        {savedRoles.map(role => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className="p-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all"
          >
            {role.role_title}
          </button>
        ))}
      </div>
    </div>
  );
}