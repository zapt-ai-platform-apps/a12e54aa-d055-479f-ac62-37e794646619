import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20 py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-gray-600">
          Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ZAPT</a>
        </p>
      </div>
    </footer>
  );
}