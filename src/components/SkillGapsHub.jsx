import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import LoadingSpinner from './LoadingSpinner';
import Section from './Section';

export default function SkillGapsHub() {
  const [savedRoles, setSavedRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [essentialCourses, setEssentialCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const [workOpportunities, setWorkOpportunities] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRoles = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('user_roles')
          .select('id, role_title')
          .eq('user_id', user.id);

        if (error) throw error;
        setSavedRoles(data);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching roles:', error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchSavedRoles();
  }, []);

  useEffect(() => {
    const fetchRoleData = async () => {
      if (!selectedRole) return;
      
      try {
        setLoadingData(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        const [essentialRes, usefulRes, opportunitiesRes] = await Promise.all([
          fetch(`/api/fetch-essential-courses?role=${encodeURIComponent(selectedRole)}`, {
            headers: { Authorization: `Bearer ${session?.access_token}` }
          }),
          fetch(`/api/fetch-useful-courses?role=${encodeURIComponent(selectedRole)}`, {
            headers: { Authorization: `Bearer ${session?.access_token}` }
          }),
          fetch(`/api/fetch-work-opportunities?role=${encodeURIComponent(selectedRole)}`, {
            headers: { Authorization: `Bearer ${session?.access_token}` }
          })
        ]);

        const essentialData = await essentialRes.json();
        const usefulData = await usefulRes.json();
        const opportunitiesData = await opportunitiesRes.json();

        setEssentialCourses(essentialData.courses);
        setFreeCourses(usefulData.free);
        setPaidCourses(usefulData.paid);
        setWorkOpportunities(opportunitiesData.opportunities);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching role data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchRoleData();
  }, [selectedRole]);

  if (loadingRoles) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Close My Skill Gaps Hub</h1>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a role to focus on:
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">Choose a role</option>
            {savedRoles.map(role => (
              <option key={role.id} value={role.role_title}>
                {role.role_title}
              </option>
            ))}
          </select>
          {savedRoles.length === 0 && (
            <p className="mt-2 text-sm text-red-600">
              Complete the Role Explorer module to unlock this feature
            </p>
          )}
        </div>

        {selectedRole && (
          <div className="space-y-8">
            <Section 
              title="Essential Courses"
              items={essentialCourses}
              loading={loadingData}
            />
            
            <Section 
              title="Free Courses"
              items={freeCourses}
              loading={loadingData}
              type="free"
            />
            
            <Section 
              title="Paid Courses"
              items={paidCourses}
              loading={loadingData}
              type="paid"
            />
            
            <Section 
              title="Work Experience Opportunities"
              items={workOpportunities}
              loading={loadingData}
              type="opportunity"
            />
          </div>
        )}
      </div>
    </div>
  );
}