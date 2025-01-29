import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase, recordLogin } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth component")
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      console.log("Auth component event")
      if (event === 'SIGNED_IN') {
        console.log("Auth component event - sign in")
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log("Auth component event, user: ", user)
        if (user?.email) {
          try {
            console.log("Auth component - recordLogin")
            await recordLogin(user.email);
          } catch (error) {
            console.error('Failed to record login:', error);
          }
        }
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        />
        <p className="text-sm text-gray-600 mt-4 text-center">
          By continuing, you agree to our <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
