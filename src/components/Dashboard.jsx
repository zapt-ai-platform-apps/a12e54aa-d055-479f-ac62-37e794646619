import React, { useState, useEffect } from 'react';
import { modules } from './data/dashboardModules';
import { supabase } from '../supabaseClient';
import Navigation from './Navigation';
import ModuleCard from './ModuleCard';

export default function Dashboard() {
  const [savedRoles, setSavedRoles] = useState([]);

  useEffect(() => {
    const fetchSavedRoles = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', user.id);
      
      setSavedRoles(data || []);
    };
    
    fetchSavedRoles();
  }, []);

  const updatedModules = modules.map(module => {
    if (module.title === 'Find My Niche') {
      return {
        ...module,
        status: savedRoles.length > 0 ? 'available' : 'locked'
      };
    }
    return module;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Development Modules</h2>
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