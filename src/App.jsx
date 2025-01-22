import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthComponent from './components/Auth';
import Dashboard from './components/Dashboard';
import RoleExplorer from './components/RoleExplorer';
import GuidedExplorer from './components/GuidedExplorer';
import CustomRoleExplorer from './components/CustomRoleExplorer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-explorer" element={<RoleExplorer />} />
        <Route path="/role-explorer/guided" element={<GuidedExplorer />} />
        <Route path="/role-explorer/custom/:role" element={<CustomRoleExplorer />} />
      </Routes>
    </Router>
  );
}