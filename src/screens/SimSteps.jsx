import React from 'react';

export function RoleSelectionStep({ savedRoles, onRoleSelect }) {
  return (
    <div>
      <h2>Select a Role</h2>
      {savedRoles && savedRoles.length > 0 ? (
        savedRoles.map((role) => (
          <button key={role.id} onClick={() => onRoleSelect(role.id)}>
            {role.role_title}
          </button>
        ))
      ) : (
        <div>No roles available</div>
      )}
    </div>
  );
}

export function ScenarioStep({ selectedRole, responses, setResponses, isSubmitting, onSubmit, scenarios }) {
  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  return (
    <div>
      <h2>Scenario for {selectedRole.role_title}</h2>
      {scenarios && scenarios.length > 0 ? (
        scenarios.map((scenario, index) => (
          <div key={index}>
            <p>{typeof scenario === 'object' ? scenario.question : scenario}</p>
            <textarea
              value={responses[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        ))
      ) : (
        <div>No scenarios available</div>
      )}
      <button onClick={onSubmit} disabled={isSubmitting}>
        Submit Responses
      </button>
    </div>
  );
}

export function SimulationFeedbackStep({ feedback, courses, onSaveResults, onTryAnother }) {
  return (
    <div>
      <h2>Feedback</h2>
      <p>{feedback}</p>
      <h3>Recommended Courses</h3>
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.title || course}</li>
          ))}
        </ul>
      ) : (
        <div>No courses available</div>
      )}
      <button onClick={onSaveResults}>Save Results</button>
      <button onClick={onTryAnother}>Try Another</button>
    </div>
  );
}