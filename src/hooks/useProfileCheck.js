import { useState, useEffect } from "react";
import * as Sentry from "@sentry/browser";
import { supabase } from "../supabaseClient";

export function useProfileCheck() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          setHasProfile(false);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/user-profile", {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Profile check failed");
        }
        
        const data = await response.json();
        // Updated check: Verify profile has required fields
        const hasRequiredFields = data.academic_year && 
          data.subjects?.length > 0 && 
          data.predicted_grades?.length > 0 &&
          data.location_preference;
        setHasProfile(hasRequiredFields);
      } catch (error) {
        console.error("Profile check error:", error);
        Sentry.captureException(error);
        setError(error.message || "Failed to check profile");
      } finally {
        setLoading(false);
      }
    };
    
    checkProfile();
  }, []);

  return { hasProfile, loading, error };
}