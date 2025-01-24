import React from 'react';

export default function ScenarioStep({ 
  selectedRole, 
  responses, 
  setResponses, 
  isSubmitting, 
  onSubmit,
  scenarios
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Day in the Life: {selectedRole.role_title}</h2>
      <div className="space-y-4">
        {scenarios[selectedRole.role_title]?.map((scenario, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">{scenario.time}</h3>
            <p className="mb-2">{scenario.scenario}</p>
            <textarea
              placeholder="How would you handle this situation?"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setResponses(prev => ({
                ...prev,
                [index]: e.target.value
              }))}
            />
          </div>
        ))}
      </div>
      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Submit Responses'}
      </button>
    </div>
  );
}