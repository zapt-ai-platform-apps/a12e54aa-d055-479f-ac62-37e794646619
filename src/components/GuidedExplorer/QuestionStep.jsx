import React from 'react';
import { motion } from 'framer-motion';

export default function QuestionStep({ currentStep, questions, handleAnswerSelect }) {
  return (
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
  );
}