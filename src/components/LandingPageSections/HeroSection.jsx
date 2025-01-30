import React from 'react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <header className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Shape Your Future with AI-Powered Career Guidance
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover your ideal career path through personalized AI coaching, real-world insights, and actionable steps tailored for students.
      </p>
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg blur opacity-75"></div>
        <Link 
          to="/login" 
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg hover:brightness-110 transition-all"
        >
          Start Your Journey
        </Link>
      </div>
      
      <div className="mt-12">
        <img src="https://images.unsplash.com/photo-1522198648249-0657d7ff242a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw1fHxncm91cCUyMG9mJTIwZGl2ZXJzZSUyMHN0dWRlbnRzJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwb24lMjBsYXB0b3BzJTIwaW4lMjBhJTIwbW9kZXJuJTIwY2xhc3Nyb29tJTIwc2V0dGluZ3xlbnwwfHx8fDE3MzgyNjQzMjR8MA&ixlib=rb-4.0.3&q=80&w=1080"  
          alt="Students collaborating on career planning" 
          data-image-request="group of diverse students working together on laptops in a modern classroom setting"
          className="rounded-xl shadow-lg w-full max-w-4xl mx-auto"
        />
      </div>
    </header>
  );
}