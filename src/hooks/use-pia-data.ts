
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
      
      // Check session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      // Query the PIA table - the RLS policies will handle authorization
      let query = supabase
        .from('professional_independent_aides')
        .select(`
          id,
          name,
          status,
          years_experience,
          hourly_rate,
          locations_serviced,
          services_provided,
          languages,
          verification_status,
          created_at,
          updated_at
        `);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,locations_serviced::text.ilike.%${searchTerm}%,services_provided::text.ilike.%${searchTerm}%`);
      }

      if (sortField && ['created_at', 'hourly_rate', 'years_experience', 'name'].includes(sortField)) {
        query = query.order(sortField, { ascending: sortOrder === 'asc' });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching PIAs:', error);
        if (error.message?.includes('JWTClaimsError')) {
          throw new Error('Session expired. Please sign in again.');
        }
        throw error;
      }

      console.log('Successfully fetched PIAs:', data?.length || 0);
      return data;
    },
  });
};
