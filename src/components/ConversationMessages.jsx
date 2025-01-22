import React from 'react';

export default function ConversationMessages({ conversation }) {
  return (
    <div className="mb-6 space-y-4">
      {conversation.map((msg, index) => (
        <div key={index} className={`p-4 rounded-lg ${msg.type === 'ai' ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <p className="font-medium">{msg.type === 'ai' ? 'Career Coach' : 'You'}:</p>
          <p className="mt-1">{msg.content}</p>
        </div>
      ))}
    </div>
  );
}