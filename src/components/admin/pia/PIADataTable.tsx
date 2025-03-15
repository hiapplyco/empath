
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PIAProfileCard } from './PIAProfileCard';
import { useState } from 'react';

export const PIADataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [verificationStatus, setVerificationStatus] = useState('all');

  const { data: pias, isLoading } = useQuery({
    queryKey: ['pias', searchTerm, status, verificationStatus],
    queryFn: async () => {
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

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      if (verificationStatus !== 'all') {
        query = query.eq('verification_status', verificationStatus);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pias?.map((pia) => (
        <PIAProfileCard key={pia.id} pia={pia} />
      ))}
      {pias?.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No professional aides found matching your criteria
        </div>
      )}
    </div>
  );
};
