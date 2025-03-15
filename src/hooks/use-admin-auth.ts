
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (isMounted) {
            setIsAdmin(false);
            setIsChecking(false);
            setError('No active session');
          }
          return;
        }

        const { data: adminStatus, error: adminError } = await supabase.rpc('check_admin_access');

        if (adminError) {
          console.error('Admin check error:', adminError);
          throw adminError;
        }

        if (isMounted) {
          setIsAdmin(!!adminStatus);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Admin check error:', err);
          setError(err.message);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    // Run check immediately
    checkAdminStatus();

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []); // Only run effect on mount

  return { isAdmin, isChecking, error };
};
