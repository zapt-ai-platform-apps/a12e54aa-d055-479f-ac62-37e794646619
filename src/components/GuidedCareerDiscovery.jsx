import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationMessages from './ConversationMessages';
import SuggestedRolesList from './SuggestedRolesList';
import { useGuidedCareerLogic } from './hooks/useGuidedCareerLogic';

export default function GuidedCareerDiscovery() {
  const navigate = useNavigate();
  const {
    conversation,
    userInput,
    setUserInput,
    suggestedRoles,
    isLoading,
    handleSubmit
  } = useGuidedCareerLogic();

  const handleRoleSelect = (role) => {
    navigate(`/role-explorer/guided/${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Guided Career Discovery</h1>
        
        <ConversationMessages conversation={conversation} />

        {suggestedRoles.length > 0 ? (
          <SuggestedRolesList 
            suggestedRoles={suggestedRoles}
            handleRoleSelect={handleRoleSelect}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border rounded-lg"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}