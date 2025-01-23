import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { fetchAIResponse, fetchCourses, saveRole } from '../services/guidedExplorerApi';

export default function useGuidedExplorer(navigate) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleSuggestions, setRoleSuggestions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [courses, setCourses] = useState([]);
  const [academicData, setAcademicData] = useState({
    year: '',
    subjects: '',
    grades: '',
    location: ''
  });

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
      const { data: { user } } = await supabase.auth.getUser();
      const coursesData = await fetchCourses(role, user.id);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await saveRole(selectedRole, courses, user, academicData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    handleAIResponse(`Start career discovery conversation. Ask the first question to understand the student's interests.`);
  }, []);

  return {
    messages,
    input,
    loading,
    roleSuggestions,
    selectedRole,
    courses,
    academicData,
    handleSubmit,
    handleRoleSelect,
    handleAcademicChange,
    handleSaveRole,
    setInput
  };
}