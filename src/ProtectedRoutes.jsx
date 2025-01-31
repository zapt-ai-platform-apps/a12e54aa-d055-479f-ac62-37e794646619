import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { 
  Dashboard,
  ProfileSetup,
  ProfileViewEdit,
  RoleExplorer,
  GuidedExplorer,
  CustomRoleExplorer,
  FindMyNiche,
  WorkEnvironmentWizard,
  DayInLifeSimulator,
  SkillGapsHub,
  ApplicationHub 
} from './routes';

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/profile-setup" element={
        <ProtectedRoute>
          <ProfileSetup />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfileViewEdit />
        </ProtectedRoute>
      } />
      
      <Route path="/role-explorer" element={
        <ProtectedRoute>
          <RoleExplorer />
        </ProtectedRoute>
      } />
      
      <Route path="/role-explorer/guided" element={
        <ProtectedRoute>
          <GuidedExplorer />
        </ProtectedRoute>
      } />
      
      <Route path="/role-explorer/custom/:role" element={
        <ProtectedRoute>
          <CustomRoleExplorer />
        </ProtectedRoute>
      } />
      
      <Route path="/find-my-niche" element={
        <ProtectedRoute>
          <FindMyNiche />
        </ProtectedRoute>
      } />
      
      <Route path="/work-environment" element={
        <ProtectedRoute>
          <WorkEnvironmentWizard />
        </ProtectedRoute>
      } />
      
      <Route path="/day-in-life" element={
        <ProtectedRoute>
          <DayInLifeSimulator />
        </ProtectedRoute>
      } />
      
      <Route path="/skill-gaps-hub" element={
        <ProtectedRoute>
          <SkillGapsHub />
        </ProtectedRoute>
      } />
      
      <Route path="/application-hub" element={
        <ProtectedRoute>
          <ApplicationHub />
        </ProtectedRoute>
      } />
    </Routes>
  );
}