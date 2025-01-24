import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export function useFindMyNiche() {
  const navigate = useNavigate();
  const [savedRoles, setSavedRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSavedRoles = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('user_roles')
          .select('id, role_title')
          .eq('user_id', user.id);

        if (error) throw error;
        setSavedRoles(data);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRoles();
  }, []);

  const startChallenge = async (roleId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/niche-challenges?role_id=${roleId}`);
      if (!response.ok) throw new Error('Failed to load challenges');
      const data = await response.json();
      setChallenges(data.challenges);
      setCurrentChallenge(data.challenges[0]);
      setSelectedRole(roleId);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Challenge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setCurrentChallenge(null);
    setFeedback(null);
    setUserResponse('');
  };

  const submitResponse = async () => {
    try {
      setIsSubmitting(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/submit-challenge-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          challenge_id: currentChallenge.id,
          response: userResponse,
          role_id: selectedRole
        })
      });

      const result = await response.json();
      setFeedback(result.feedback);
      
      if (result.specializations) {
        setSpecializations(result.specializations);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextChallenge = () => {
    const currentIndex = challenges.findIndex(c => c.id === currentChallenge.id);
    if (currentIndex < challenges.length - 1) {
      setCurrentChallenge(challenges[currentIndex + 1]);
      setUserResponse('');
      setFeedback(null);
    }
  };

  return {
    savedRoles,
    selectedRole,
    challenges,
    currentChallenge,
    userResponse,
    feedback,
    specializations,
    loading,
    isSubmitting,
    setUserResponse,
    startChallenge,
    handleBack,
    submitResponse,
    handleNextChallenge,
    navigate
  };
}