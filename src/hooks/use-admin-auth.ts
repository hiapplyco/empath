
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
          }
          return;
        }

        // Use the simplified check_admin_access function
        const { data, error: funcError } = await supabase.rpc('check_admin_access');
        
        if (funcError) throw funcError;

        if (isMounted) {
          setIsAdmin(!!data);
          setError(null);
        }
      } catch (err: any) {
        console.error('Admin check error:', err);
        if (isMounted) {
          setIsAdmin(false);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isChecking, error };
};
