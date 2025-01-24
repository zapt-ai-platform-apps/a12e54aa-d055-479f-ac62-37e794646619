import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { questions } from '../data/guidedExplorerQuestions';
import { calculateRecommendations } from '../api/recommendations';
import ProgressBar from './ProgressBar';
import RoleRecommendations from './RoleRecommendations';

export default function GuidedExplorer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const navigate = useNavigate();

  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentStep];
    const newAnswers = {
      ...answers,
      [currentQuestion.key]: [...(answers[currentQuestion.key] || []), answer]
    };
    
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      calculateRecommendations(newAnswers)
        .then(data => setRecommendations(data))
        .catch(() => { /* Error already handled in API */ });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <ProgressBar total={questions.length} current={currentStep + 1} />
        
        {!recommendations ? (
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">
              {questions[currentStep].text}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {questions[currentStep].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(option)}
                  className="p-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <RoleRecommendations 
            recommendations={recommendations}
            onBack={() => setCurrentStep(0)}
            onSave={() => navigate('/dashboard')}
          />
        )}
      </div>
    </div>
  );
}