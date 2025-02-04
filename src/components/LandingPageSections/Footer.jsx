import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="border-t border-gray-200 mt-20 py-8 text-center bg-white"
    >
      <div className="container mx-auto px-6">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} ImmerJ. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">ZAPT</a>
        </p>
      </div>
    </motion.footer>
  );
}