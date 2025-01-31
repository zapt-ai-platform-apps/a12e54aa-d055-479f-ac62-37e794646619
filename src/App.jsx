import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoutes from './ProtectedRoutes';
import LandingPage from './routes';

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