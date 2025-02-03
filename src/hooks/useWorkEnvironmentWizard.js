import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { handleSubmitAnswers } from '../components/WorkEnvironmentWizard/handleSubmitAnswers';

export default function useWorkEnvironmentWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setTimeout(() => setCurrentStep(prev => prev + 1), 300);
  };

  const submitAnswers = async () => {
    await handleSubmitAnswers({
      answers,
      setLoading,
      setRecommendations,
      supabase
    });
  };

  return {
    currentStep,
    answers,
    recommendations,
    loading,
    handleAnswer,
    submitAnswers
  };
}