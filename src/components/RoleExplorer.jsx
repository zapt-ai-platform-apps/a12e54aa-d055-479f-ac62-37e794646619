import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import GuidedSection from './RoleExplorer/GuidedSection';
import CustomRoleForm from './RoleExplorer/CustomRoleForm';
import UserProfileForm from './RoleExplorer/UserProfileForm';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function RoleExplorer() {
  const [customRole, setCustomRole] = useState('');
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { count } = await supabase
          .from('user_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        setHasProfile(count > 0);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Profile check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkProfile();
  }, []);

  const handleGuidedStart = () => navigate('/role-explorer/guided');
  const handleCustomStart = (e) => {
    e.preventDefault();
    if (customRole.trim()) {
      navigate(`/role-explorer/custom/${encodeURIComponent(customRole.trim())}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Role Explorer</h1>
          
          {!hasProfile ? (
            <UserProfileForm onComplete={() => setHasProfile(true)} />
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600 mb-8">
                Discover careers that align with your interests through either our guided AI assessment 
                or by exploring a specific role of your choice.
              </p>
              <GuidedSection onStart={handleGuidedStart} />
              <CustomRoleForm 
                onSubmit={handleCustomStart}
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}