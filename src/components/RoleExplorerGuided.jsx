import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { IntroductionStep, ConversationStep, ResultsStep, CoursesStep } from './RoleExplorerGuided/steps';
import { startGuidedExplorationApi, submitResponseApi } from '../../api/guidedExploration';

export default function RoleExplorerGuided() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('introduction');
  const [recommendations, setRecommendations] = useState(null);
  const navigate = useNavigate();

  const startGuidedExploration = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const data = await startGuidedExplorationApi(session);
      setMessages([{ content: data.question, type: 'ai' }]);
      setStep('conversation');
    } catch (error) {
      console.error('Error starting exploration:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const newMessages = [...messages, { content: input, type: 'user' }];
      setMessages(newMessages);
      setInput('');

      const data = await submitResponseApi(session, input);
      
      if (data.completed) {
        setRecommendations(data.recommendations);
        setStep('results');
      } else {
        setMessages([...newMessages, { content: data.nextQuestion, type: 'ai' }]);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {step === 'introduction' && <IntroductionStep startGuidedExploration={startGuidedExploration} loading={loading} />}
        {step === 'conversation' && <ConversationStep messages={messages} input={input} setInput={setInput} loading={loading} handleSubmit={handleSubmit} />}
        {step === 'results' && recommendations && <ResultsStep recommendations={recommendations} setStep={setStep} />}
        {step === 'courses' && <CoursesStep recommendations={recommendations} navigate={navigate} setStep={setStep} />}
      </div>
    </div>
  );
}