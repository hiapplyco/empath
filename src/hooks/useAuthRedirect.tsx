
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const useAuthRedirect = (redirectTo: string = "/auth") => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate(redirectTo);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate(redirectTo);
      } else if (event === "SIGNED_IN") {
        navigate("/onboarding");
      }
    });

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate, redirectTo]);
};
