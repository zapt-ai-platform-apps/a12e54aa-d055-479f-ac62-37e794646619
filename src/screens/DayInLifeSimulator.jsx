import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import RoleSelectionStep from '../components/RoleSelectionStep';
import ScenarioStep from './ScenarioStep';
import SimulationFeedbackStep from './SimulationFeedbackStep';
import { scenarios } from '../data/dayInLifeQuestions';
import { fetchUserSavedRoles, fetchCoursesForRole, saveUserSpecialization } from '../api/dayInLifeSimulatorApi';
import * as Sentry from '@sentry/browser';

export default function DayInLifeSimulator() {
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
    const fetchData = async () => {
      const roles = await fetchUserSavedRoles();
      setSavedRoles(roles);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRoleSelect = (roleId) => {
    const role = savedRoles.find(r => r.id === roleId);
    setSelectedRole(role);
    setCurrentStep(1);
  };

  const handleResponseSubmit = async () => {
    setIsSubmitting(true);
    try {
      const feedbackText = "Strong problem-solving demonstrated. Consider developing more collaborative approaches.";
      setFeedback(feedbackText);
      const fetchedCourses = await fetchCoursesForRole(selectedRole);
      setCourses(fetchedCourses);
      setCurrentStep(2);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveResults = async () => {
    try {
      await saveUserSpecialization(selectedRole, feedback, courses);
      navigate('/dashboard');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Save error:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {currentStep === 0 && (
          <RoleSelectionStep 
            savedRoles={savedRoles} 
            onRoleSelect={handleRoleSelect} 
          />
        )}
        {currentStep === 1 && selectedRole && (
          <ScenarioStep
            selectedRole={selectedRole}
            responses={responses}
            setResponses={setResponses}
            isSubmitting={isSubmitting}
            onSubmit={handleResponseSubmit}
            scenarios={scenarios[selectedRole.role_title] || []}
          />
        )}
        {currentStep === 2 && (
          <SimulationFeedbackStep
            feedback={feedback}
            courses={courses}
            onSaveResults={handleSaveResults}
            onTryAnother={() => setCurrentStep(0)}
          />
        )}
      </div>
    </div>
  );
}