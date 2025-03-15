
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UsePIADataProps {
  searchTerm?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export const usePIAData = ({ searchTerm, sortField, sortOrder }: UsePIADataProps = {}) => {
  return useQuery({
    queryKey: ['pias', searchTerm, sortField, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from('pia')
        .select('*');

      if (searchTerm) {
        query = query.or(
          `"Name".ilike.%${searchTerm}%,` +
          `"Email".ilike.%${searchTerm}%,` +
          `"Locations Serviced".ilike.%${searchTerm}%,` +
          `"Services Provided".ilike.%${searchTerm}%,` +
          `"Bio".ilike.%${searchTerm}%,` +
          `"License Type".ilike.%${searchTerm}%,` +
          `"Languages".ilike.%${searchTerm}%,` +
          `"Education".ilike.%${searchTerm}%,` +
          `"Experience".ilike.%${searchTerm}%,` +
          `"Available Shifts".ilike.%${searchTerm}%,` +
          `"Pet Preferences".ilike.%${searchTerm}%`
        );
      }

      if (sortField && sortOrder) {
        const columnMap: Record<string, string> = {
          'name': 'Name',
          'created_at': 'Name',
          'hourly_rate': 'Hourly Rate',
          'years_experience': 'Experience'
        };

        const actualField = columnMap[sortField] || sortField;
        query = query.order(actualField, { ascending: sortOrder === 'asc' });
      }

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
        phone_number: pia['Phone Number'],
        bio: pia['Bio'],
        license_type: pia['License Type']?.split(',') || [],
        education: pia['Education']?.split(',') || [],
        available_shifts: pia['Available Shifts'],
        pet_preferences: pia['Pet Preferences']?.split(',') || [],
        hca_registry_id: pia['HCA Registry ID'],
        hca_expiration_date: pia['HCA Expiration Date'],
        background_check: pia['Type of Background Check'],
        vaccinations: pia['Vaccinations']?.split(',') || []
      }));
    },
  });
};

export const useAuthenticatedPIAProfile = () => {
  return useQuery({
    queryKey: ['authenticated-pia-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pia')
        .select('*')
        .eq('Email', user.email)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data['Email'] || `${data['Name']}-${data['Phone Number']}`,
        name: data['Name'],
        status: 'active',
        years_experience: data['Experience'],
        hourly_rate: data['Hourly Rate'],
        locations_serviced: data['Locations Serviced']?.split(',') || [],
        services_provided: data['Services Provided']?.split(',') || [],
        languages: data['Languages']?.split(',') || [],
        verification_status: 'pending',
        email: data['Email'],
        phone_number: data['Phone Number'],
        bio: data['Bio'],
        license_type: data['License Type']?.split(',') || [],
        education: data['Education']?.split(',') || [],
        available_shifts: data['Available Shifts'],
        pet_preferences: data['Pet Preferences']?.split(',') || [],
        hca_registry_id: data['HCA Registry ID'],
        hca_expiration_date: data['HCA Expiration Date'],
        background_check: data['Type of Background Check'],
        vaccinations: data['Vaccinations']?.split(',') || []
      };
    }
  });
};
