
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UsePIADataProps {
  searchTerm: string;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

export const usePIAData = ({ searchTerm, sortField, sortOrder }: UsePIADataProps) => {
  return useQuery({
    queryKey: ['pias', searchTerm, sortField, sortOrder],
    queryFn: async () => {
      console.log('Fetching PIAs with params:', { searchTerm, sortField, sortOrder });
      
      // First check if we have an active session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('User not authenticated');
      }

      // Check if user is admin using our security definer function
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });

      console.log('Admin check result:', { isAdmin, adminError });

      if (adminError || !isAdmin) {
        throw new Error('not authorized');
      }

      let query = supabase
        .from('professional_independent_aides')
        .select('*');

      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,` +
          `email.ilike.%${searchTerm}%,` +
          `locations_serviced.cs.{${searchTerm}},` +
          `services_provided.cs.{${searchTerm}}`
        );
      }

      const { data, error } = await query.order(sortField, { ascending: sortOrder === 'asc' });

      if (error) {
        console.error('Error fetching PIAs:', error);
        throw error;
      }

      console.log('Fetched PIAs:', data);
      return data;
    },
  });
};
