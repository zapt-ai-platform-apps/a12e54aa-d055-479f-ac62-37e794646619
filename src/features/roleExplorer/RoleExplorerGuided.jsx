import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { questions } from '../../data/guidedExplorerQuestions';
import { calculateRecommendations } from '../../api/recommendations';
import ProgressBar from '../../components/ProgressBar';
import RoleRecommendations from '../../components/RoleRecommendations';
import QuestionStep from './RoleExplorerComponents/RoleExplorerGuided/QuestionStep';

export default function RoleExplorerGuided() {
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
        .catch(() => {});
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <ProgressBar total={questions.length} current={currentStep + 1} />

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <span className="text-gray-600">Step {currentStep + 1} of {questions.length}</span>
        </div>

        {!recommendations ? (
          <QuestionStep
            currentStep={currentStep}
            questions={questions}
            handleAnswerSelect={handleAnswerSelect}
          />
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