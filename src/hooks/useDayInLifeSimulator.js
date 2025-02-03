import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSavedRoles, submitSimulationResponse, saveSimulationResults } from '../services/dayInLifeService';

function useDayInLifeSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [savedRoles, setSavedRoles] = useState([]);
  const [responses, setResponses] = useState({});
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRoles() {
      try {
        const roles = await fetchSavedRoles();
        setSavedRoles(roles || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRoles();
  }, []);

  const handleRoleSelect = (roleId) => {
    const role = savedRoles.find(r => r.id === roleId);
    setSelectedRole(role);
    setCurrentStep(1);
  };

  const handleResponseSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { feedback: feedbackText, courses: fetchedCourses } = await submitSimulationResponse(selectedRole);
      setFeedback(feedbackText);
      setCourses(fetchedCourses);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveResults = async () => {
    try {
      await saveSimulationResults(selectedRole, feedback, courses);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return {
    currentStep,
    savedRoles,
    selectedRole,
    responses,
    setResponses,
    courses,
    feedback,
    loading,
    isSubmitting,
    handleRoleSelect,
    handleResponseSubmit,
    handleSaveResults,
    setCurrentStep,
  };
}

export default useDayInLifeSimulator;