
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
      let query = supabase
        .from('pia')
        .select('*');

      if (searchTerm) {
        query = query.or(`"Name".ilike.%${searchTerm}%,"Email".ilike.%${searchTerm}%,"Locations Serviced".ilike.%${searchTerm}%`);
      }

      // Map the frontend sort fields to actual column names
      const columnMap: Record<string, string> = {
        'name': 'Name',
        'created_at': 'Name', // Using Name as fallback since pia table doesn't have created_at
        'hourly_rate': 'Hourly Rate',
        'years_experience': 'Experience'
      };

      const actualField = columnMap[sortField] || sortField;
      query = query.order(actualField, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;

      if (error) throw error;
      return data?.map(pia => ({
        id: pia['Email'] || `${pia['Name']}-${pia['Phone Number']}` || Math.random().toString(),
        name: pia['Name'],
        status: 'active',
        years_experience: pia['Experience'],
        hourly_rate: pia['Hourly Rate'],
        locations_serviced: pia['Locations Serviced']?.split(',') || [],
        services_provided: pia['Services Provided']?.split(',') || [],
        languages: pia['Languages']?.split(',') || [],
        verification_status: 'pending',
        email: pia['Email'],
        phone_number: pia['Phone Number']
      }));
    },
  });
};
