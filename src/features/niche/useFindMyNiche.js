import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { getSavedRoles, fetchChallenges, submitChallengeResponse } from './nicheAPI';

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
    const fetchRoles = async () => {
      try {
        const roles = await getSavedRoles();
        setSavedRoles(roles);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const startChallenge = async (roleId) => {
    try {
      setLoading(true);
      const data = await fetchChallenges(roleId);
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
      const result = await submitChallengeResponse(currentChallenge.id, userResponse, selectedRole);
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