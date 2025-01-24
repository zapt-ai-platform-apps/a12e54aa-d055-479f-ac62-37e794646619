import React from 'react';
import { motion } from 'framer-motion';

export default function QuestionStep({ question, handleAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-center">{question.theme}</h2>
      <p className="text-xl text-center text-gray-600">{question.question}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(question.id, option)}
            className="p-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
}