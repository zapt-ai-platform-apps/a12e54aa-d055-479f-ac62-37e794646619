import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthComponent from './components/Auth';
import Dashboard from './components/Dashboard';
import RoleExplorer from './components/RoleExplorer';
import GuidedExplorer from './components/GuidedExplorer';
import CustomRoleExplorer from './components/CustomRoleExplorer';
import FindMyNiche from './components/FindMyNiche';
import WorkEnvironmentWizard from './components/WorkEnvironmentWizard';
import DayInLifeSimulator from './components/DayInLifeSimulator';
import SkillGapsHub from './components/SkillGapsHub';
import ApplicationHub from './components/ApplicationHub';
import ProfileSetup from './components/ProfileSetup';
import ProfileViewEdit from './components/ProfileViewEdit';
import { supabase, recordLogin } from './supabaseClient';
import * as Sentry from '@sentry/browser';

export default function App() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user?.email) {
          try {
            await recordLogin(user.email);
          } catch (error) {
            console.error('Failed to record login:', error);
            Sentry.captureException(error);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile" element={<ProfileViewEdit />} />
        <Route path="/role-explorer" element={<RoleExplorer />} />
        <Route path="/role-explorer/guided" element={<GuidedExplorer />} />
        <Route path="/role-explorer/custom/:role" element={<CustomRoleExplorer />} />
        <Route path="/find-my-niche" element={<FindMyNiche />} />
        <Route path="/work-environment" element={<WorkEnvironmentWizard />} />
        <Route path="/day-in-life" element={<DayInLifeSimulator />} />
        <Route path="/skill-gaps-hub" element={<SkillGapsHub />} />
        <Route path="/application-hub" element={<ApplicationHub />} />
      </Routes>
    </Router>
  );
}