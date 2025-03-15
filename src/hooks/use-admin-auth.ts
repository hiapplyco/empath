
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
          setIsAdmin(false);
          setError('No active session');
          return;
        }

        const { data: adminStatus, error: adminError } = await supabase.rpc('is_admin', {
          user_id: session.user.id
        });

        if (adminError) throw adminError;

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

    checkAdminStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isAdmin, isChecking, error };
};
