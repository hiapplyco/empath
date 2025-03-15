
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
        console.error('Authentication error:', sessionError);
        throw new Error('User not authenticated');
      }

      // Use our new security definer function to check admin status
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin_user', {
        user_id: session.user.id
      });

      console.log('Admin check result:', { isAdmin, adminError });

      if (adminError) {
        console.error('Admin check error:', adminError);
        throw new Error('Error checking admin status');
      }

      if (!isAdmin) {
        console.error('User is not an admin');
        throw new Error('Not authorized - Admin access required');
      }

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
        query = query.or(`name.ilike.%${searchTerm}%`)
                    .or(`email.ilike.%${searchTerm}%`)
                    .or(`locations_serviced::text.ilike.%${searchTerm}%`)
                    .or(`services_provided::text.ilike.%${searchTerm}%`);
      }

      if (sortField === 'created_at' || sortField === 'hourly_rate' || sortField === 'years_experience' || sortField === 'name') {
        query = query.order(sortField, { ascending: sortOrder === 'asc' });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching PIAs:', error);
        throw error;
      }

      console.log('Fetched PIAs:', data);
      return data;
    },
  });
};
