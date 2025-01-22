import { useState } from 'react';
import * as Sentry from '@sentry/browser';

export function useGuidedCareerLogic() {
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [suggestedRoles, setSuggestedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const newConversation = [...conversation, 
        { type: 'user', content: userInput },
        { type: 'ai', content: currentQuestion }
      ];

      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput })
      });

      const data = await response.json();
      
      if (data.complete) {
        setSuggestedRoles(data.roles);
      } else {
        setCurrentQuestion(data.question);
        newConversation.push({ type: 'ai', content: data.question });
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

  return {
    conversation,
    userInput,
    setUserInput,
    suggestedRoles,
    isLoading,
    handleSubmit
  };
}