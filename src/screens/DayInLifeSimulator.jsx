import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/components/LoadingSpinner';
import { scenarios } from '../data/dayInLifeQuestions';
import * as Sentry from '@sentry/browser';
import RoleSelectionStep from './RoleSelectionStep';
import ScenarioStep from './ScenarioStep';
import SimulationFeedbackStep from './SimulationFeedbackStep';
import { fetchSavedRoles, fetchCoursesForRole, saveUserSpecialization } from '../services/dayInLifeSimulatorService';

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
    const loadSavedRoles = async () => {
      try {
        const roles = await fetchSavedRoles();
        setSavedRoles(roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedRoles();
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
      const fetchedCourses = await fetchCoursesForRole(selectedRole.role_title);
      setCourses(fetchedCourses);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error:', error);
      Sentry.captureException(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveResults = async () => {
    try {
      await saveUserSpecialization(selectedRole, feedback, courses);
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      Sentry.captureException(error);
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