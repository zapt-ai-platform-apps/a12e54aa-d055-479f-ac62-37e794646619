import React from 'react';

export function RoleSelectionStep({ savedRoles, onRoleSelect }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select a Role</h2>
      {savedRoles.map(role => (
        <button
          key={role.id}
          onClick={() => onRoleSelect(role.id)}
          className="block w-full text-left p-2 border rounded mb-2"
        >
          {role.role_title}
        </button>
      ))}
    </div>
  );
}

export function ScenarioStep({ selectedRole, responses, setResponses, isSubmitting, onSubmit, scenarios }) {
  const handleChange = (index, value) => {
    setResponses({
      ...responses,
      [index]: value
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Scenario for {selectedRole.role_title}</h2>
      {scenarios.map((scenario, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">{scenario}</label>
          <input
            type="text"
            value={responses[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button 
        onClick={onSubmit} 
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Responses'}
      </button>
    </div>
  );
}

export function SimulationFeedbackStep({ feedback, courses, onSaveResults, onTryAnother }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Simulation Feedback</h2>
      <p className="mb-4">{feedback}</p>
      {courses && courses.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recommended Courses:</h3>
          <ul className="list-disc list-inside">
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex space-x-4">
        <button 
          onClick={onSaveResults}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Results
        </button>
        <button 
          onClick={onTryAnother}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Try Another
        </button>
      </div>
    </div>
  );
}