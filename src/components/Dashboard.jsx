import React, { useState, useEffect } from 'react';
import { modules } from './data/dashboardModules';
import { supabase } from '../supabaseClient';
import Navigation from './Navigation';
import ModuleCard from './ModuleCard';
import LoadingSpinner from './LoadingSpinner';
import * as Sentry from '@sentry/browser';

export default function Dashboard() {
  const [savedRoles, setSavedRoles] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const [rolesRes, profileRes] = await Promise.all([
          supabase.from('user_roles').select('id').eq('user_id', user.id),
          supabase.from('user_profiles').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
        ]);

        if (rolesRes.error) throw rolesRes.error;
        if (profileRes.error) throw profileRes.error;

        setSavedRoles(rolesRes.data || []);
        setHasProfile(profileRes.count > 0);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Dashboard data error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const updatedModules = modules.map(module => ({
    ...module,
    status: !hasProfile ? 'locked' : 
      module.requiresRole && savedRoles.length === 0 ? 'locked' : 
      'available'
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Development Modules</h2>
          {!hasProfile && (
            <p className="text-red-500 mb-4">
              Complete your profile in Role Explorer to unlock all modules
            </p>
          )}
          <p className="text-gray-600">
            Complete modules in sequence to unlock your full career potential
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {updatedModules.map((module, index) => (
            <ModuleCard 
              key={module.title}
              module={module}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}