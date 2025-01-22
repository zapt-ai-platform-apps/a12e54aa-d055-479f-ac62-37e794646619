import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { fetchAIResponse, fetchCourses, saveRole } from '../services/guidedExplorerApi';

export default function GuidedExplorer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleSuggestions, setRoleSuggestions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleAIResponse = async (prompt) => {
    try {
      setLoading(true);
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      const result = await fetchAIResponse(prompt, accessToken);
      
      setMessages(prev => [...prev, { content: result, isUser: false }]);

      if (result.includes('Here are some roles')) {
        const roles = result.split('\n').filter(line => line.startsWith('-')).map(line => 
          line.replace('- ', '').split(':')[0].trim()
        );
        setRoleSuggestions(roles);
      }

    } catch (error) {
      console.error('Error:', error);
      Sentry.captureException(error);
      setMessages(prev => [...prev, 
        { content: 'Sorry, there was an error processing your request', isUser: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    await handleAIResponse(`Student Response: ${input}`);
  };

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    try {
      setLoading(true);
      const coursesData = await fetchCourses(role);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await saveRole(selectedRole, courses, user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    handleAIResponse(`Start career discovery conversation. Ask the first question to understand the student's interests.`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Guided Career Discovery</h1>
        
        <div className="space-y-4 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-lg ${msg.isUser ? 'bg-blue-50 ml-6' : 'bg-gray-50'}`}>
              <p className={msg.isUser ? 'text-blue-600' : 'text-gray-600'}>{msg.content}</p>
            </div>
          ))}
          {loading && <div className="p-4 bg-gray-50 rounded-lg animate-pulse">Analyzing response...</div>}
        </div>

        {roleSuggestions.length > 0 && !selectedRole && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Roles:</h3>
            <div className="grid gap-3">
              {roleSuggestions.map((role, i) => (
                <button
                  key={i}
                  onClick={() => handleRoleSelect(role)}
                  className="p-3 text-left bg-white border rounded-lg hover:border-blue-500 transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Courses:</h3>
            <div className="space-y-3">
              {courses.map((course, i) => (
                <a
                  key={i}
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-gray-600">{course.provider}</div>
                </a>
              ))}
            </div>
            <button
              onClick={handleSaveRole}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save This Career Path
            </button>
          </div>
        )}

        {!selectedRole && (
          <form onSubmit={handleSubmit} className="border-t pt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Submit Answer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}