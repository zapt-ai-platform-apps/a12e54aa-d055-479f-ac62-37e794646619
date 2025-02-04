import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NavigationBar() {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img 
          src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40"
          alt="ImmerJ Logo"
          className="w-10 h-10"
        />
        <div className="text-2xl font-bold text-blue-600">ImmerJ</div>
      </div>
      <Link to="/login">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </motion.div>
      </Link>
    </nav>
  );
}