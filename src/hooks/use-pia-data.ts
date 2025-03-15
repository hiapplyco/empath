
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        console.error('No authenticated session found');
        toast.error('Please sign in to view this data');
        throw new Error('Authentication required');
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
        toast.error('Failed to load data: ' + error.message);
        throw error;
      }

      console.log('Fetched PIAs:', data);
      return data;
    },
  });
};
