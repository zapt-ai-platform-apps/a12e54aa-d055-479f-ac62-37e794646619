import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import ConversationMessages from './ConversationMessages';
import SuggestedRolesList from './SuggestedRolesList';

export default function GuidedCareerDiscovery() {
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [suggestedRoles, setSuggestedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startConversation();
  }, []);

  const startConversation = async () => {
    try {
      setIsLoading(true);
      const response = await createEvent('chatgpt_request', {
        prompt: `Start guided career discovery conversation. Ask the first question to understand the student's interests. Respond in JSON format: { "question": "your question", "complete": false }`,
        response_type: 'json'
      });
      
      setCurrentQuestion(response.question);
      setConversation([{ type: 'ai', content: response.question }]);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error starting conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const newConversation = [...conversation, 
        { type: 'user', content: userInput },
        { type: 'ai', content: currentQuestion }
      ];

      const response = await createEvent('chatgpt_request', {
        prompt: `Student response: ${userInput}. Continue career discovery conversation. Respond in JSON format: { "question": "next question", "roles": ["role1", "role2"] if complete, "complete": boolean }`,
        response_type: 'json'
      });

      if (response.complete) {
        setSuggestedRoles(response.roles);
      } else {
        setCurrentQuestion(response.question);
        newConversation.push({ type: 'ai', content: response.question });
        setConversation(newConversation);
      }
      setUserInput('');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error in conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

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