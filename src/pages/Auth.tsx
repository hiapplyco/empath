
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isCaregiver = searchParams.get("role") === "caregiver";
  const returnTo = searchParams.get("returnTo");
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is already logged in, redirect them
        if (returnTo) {
          navigate(decodeURIComponent(returnTo));
        } else if (isCaregiver) {
          navigate('/dashboard');
        } else {
          navigate('/care-seeker/dashboard');
        }
      }
    };
    
    checkSession();
  }, [navigate, isCaregiver, returnTo]);

  return (
    <AuthContainer isCaregiver={isCaregiver}>
      <AuthTabs isCaregiver={isCaregiver} />
    </AuthContainer>
  );
}
