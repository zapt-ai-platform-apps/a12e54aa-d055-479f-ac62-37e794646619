import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthProvider';
import ProtectedRoutes from './ProtectedRoutes';
import { LandingPage, Dashboard, ProfileSetup, ProfileViewEdit, RoleExplorer, GuidedExplorer, CustomRoleExplorer, FindMyNiche, WorkEnvironmentWizard, DayInLifeSimulator, SkillGapsHub, ApplicationHub } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}