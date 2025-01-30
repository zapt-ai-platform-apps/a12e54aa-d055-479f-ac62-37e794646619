import React from 'react';

export const ConversationStep = ({ messages, input, setInput, loading, handleSubmit }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => window.history.back()}
        className="bg-gray-极客 200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Back
      </button>
    </div>
    
    <div className="space极客 -y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${msg.type === 'ai' ? 'bg-blue-50' : 'bg-gray-50'}`}
        >
          <p className="text-gray-800">{msg.content}</p>
        </div>
      ))}
    </div>

    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer here..."
        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  </div>
);