import React from 'react';

function RoleSelection({ savedRoles, startChallenge }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Select a Role to Explore:</h2>
      {savedRoles.map(role => (
        <button
          key={role.id}
          onClick={() => startChallenge(role.id)}
          className="w-full p-4 text-left bg-white border rounded-lg hover:bg-blue-50 transition-colors"
        >
          {role.role_title}
        </button>
      ))}
    </div>
  );
}

export default RoleSelection;