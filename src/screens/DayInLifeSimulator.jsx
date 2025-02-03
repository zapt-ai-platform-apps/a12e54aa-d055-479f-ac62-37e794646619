import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import RoleSelectionStep from "../components/RoleSelectionStep";
import ScenarioStep from "../components/ScenarioStep";
import SimulationFeedbackStep from "../components/SimulationFeedbackStep";
import { scenarios } from '../data/dayInLifeQuestions';
import { fetchSavedRoles, submitSimulationResponse, saveSimulationResults } from '../services/dayInLifeService';

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
        setSavedRoles(roles || []);
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

  if (loading) {
    return <LoadingSpinner />;
  }

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