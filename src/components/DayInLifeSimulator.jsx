import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LoadingSpinner from './LoadingSpinner';
import { scenarios } from '../data/dayInLifeQuestions';
import * as Sentry from '@sentry/browser';
import RoleSelectionStep from './RoleSelectionStep';
import ScenarioStep from './ScenarioStep';
import SimulationFeedbackStep from './SimulationFeedbackStep';

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
    const fetchSavedRoles = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data } = await supabase
          .from('user_roles')
          .select('id, role_title')
          .eq('user_id', user.id);
        
        setSavedRoles(data || []);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedRoles();
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
      
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`/api/courses?role=${encodeURIComponent(selectedRole.role_title)}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      const data = await response.json();
      setCourses(data.courses.slice(0, 5));
      
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
      const { data: { user } } = await supabase.auth.getUser();
      await supabase
        .from('user_specializations')
        .insert([{
          user_id: user.id,
          role_id: selectedRole.id,
          specialization: 'Simulation Results',
          feedback: feedback,
          courses: courses
        }]);
      
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
            scenarios={scenarios}
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