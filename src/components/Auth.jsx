import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Sign in with ZAPT</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          socialLayout="horizontal"
          redirectTo={`${window.location.origin}/dashboard`}
          theme="light"
        />
        <p className="text-sm text-gray-600 mt-4 text-center">
          By continuing, you agree to our <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}