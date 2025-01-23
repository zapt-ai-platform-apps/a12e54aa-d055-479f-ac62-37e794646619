import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { fetchAIResponse, fetchCourses, saveRole } from '../services/guidedExplorerApi';

export const useGuidedExplorerHandlers = ({ setMessages, setRoleSuggestions, setLoading, setCourses, navigate }) => {
  const handleAIResponse = async (prompt) => {
    try {
      setLoading(true);
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      const result = await fetchAIResponse(prompt, accessToken);
      
      setMessages(prev => [...prev, { content: result.next_question, isUser: false }]);
      if (result.roles?.length > 0) setRoleSuggestions(result.roles);
    } catch (error) {
      console.error('Error:', error);
      Sentry.captureException(error);
      setMessages(prev => [...prev, { content: 'Sorry, there was an error processing your request', isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = async (role) => {
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

  const handleSaveRole = async (selectedRole, courses, academicData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await saveRole(selectedRole, courses, user, academicData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      Sentry.captureException(error);
    }
  };

  return { handleAIResponse, handleRoleSelection, handleSaveRole };
};