import React from 'react';

export default function RoleSelector({ selectedRole, setSelectedRole, savedRoles }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select a role to focus on:
      </label>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full p-2 border rounded-lg bg-white"
      >
        <option value="">Choose a role</option>
        {savedRoles.map(role => (
          <option key={role.id} value={role.role_title}>
            {role.role_title}
          </option>
        ))}
      </select>
      {savedRoles.length === 0 && (
        <p className="mt-2 text-sm text-red-600">
          Complete the Role Explorer module to unlock this feature
        </p>
      )}
    </div>
  );
}