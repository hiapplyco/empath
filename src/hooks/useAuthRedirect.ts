
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';

type AuthRedirectOptions = {
  redirectTo?: string;
  role?: 'caregiver' | 'care-seeker';
  isAdmin?: boolean;
};

export const useAuthRedirect = (options: AuthRedirectOptions = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // User is not authenticated
        toast({
          title: "Authentication required",
          description: "Please sign in to continue",
        });
        
        // Determine redirect path based on role
        let redirectPath = '/auth';
        if (options.role === 'care-seeker') {
          redirectPath = '/auth/care-seeker';
        } else if (options.role === 'caregiver') {
          redirectPath = '/auth/caregiver';
        } else if (options.isAdmin) {
          redirectPath = '/admin/auth';
        }
        
        // Add the return URL as a query parameter if specified
        if (options.redirectTo) {
          const returnTo = encodeURIComponent(options.redirectTo);
          redirectPath += `?returnTo=${returnTo}`;
        }
        
        navigate(redirectPath, { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate, toast, options]);
};
