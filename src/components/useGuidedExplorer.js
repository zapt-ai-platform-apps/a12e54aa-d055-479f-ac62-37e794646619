import { useState, useEffect } from 'react';
import { useGuidedExplorerHandlers } from './guidedExplorerHandlers';

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

  const { handleAIResponse, handleRoleSelection, handleSaveRole } = useGuidedExplorerHandlers({
    setMessages,
    setRoleSuggestions,
    setLoading,
    setCourses,
    navigate
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    await handleAIResponse(input);
  };

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    await handleRoleSelection(role);
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await handleSaveRole(selectedRole, courses, academicData);
  };

  useEffect(() => {
    handleAIResponse("Start career discovery conversation. Ask the first question to understand the student's interests.");
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
    handleSaveRole: handleSave,
    setInput
  };
}