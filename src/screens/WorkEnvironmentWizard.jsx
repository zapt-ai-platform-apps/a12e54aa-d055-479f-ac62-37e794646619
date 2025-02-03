import React from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/guidedExplorerQuestions';
import QuestionStep from '../components/WorkEnvironmentWizard/QuestionStep';
import Recommendations from '../components/WorkEnvironmentWizard/Recommendations';
import useWorkEnvironmentWizard from '../features/workEnvironment/useWorkEnvironmentWizard';

export default function WorkEnvironmentWizard() {
  const navigate = useNavigate();
  const {
    currentStep,
    answers,
    recommendations,
    loading,
    handleAnswer,
    submitAnswers
  } = useWorkEnvironmentWizard();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            Step {currentStep + 1} of {questions.length}
          </div>
        </div>

        {!recommendations ? (
          questions.map((q, index) => (
            currentStep === index && (
              <QuestionStep
                key={q.id}
                question={q}
                handleAnswer={handleAnswer}
              />
            )
          ))
        ) : (
          <Recommendations 
            recommendations={recommendations}
            navigate={navigate}
          />
        )}

        {currentStep === questions.length && !recommendations && (
          <div className="text-center mt-8">
            <button
              onClick={submitAnswers}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Get Recommendations'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}