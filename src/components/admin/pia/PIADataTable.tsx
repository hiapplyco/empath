
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const PIADataTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: pias, isLoading } = useQuery({
    queryKey: ['pias', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professional_independent_aides')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Verification</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pias?.map((pia) => (
            <TableRow key={pia.id}>
              <TableCell className="font-medium">{pia.name}</TableCell>
              <TableCell>{pia.license_type?.join(', ')}</TableCell>
              <TableCell>
                <Badge variant={pia.status === 'active' ? 'default' : 'secondary'}>
                  {pia.status}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(pia.created_at), 'MMM d, yyyy')}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    pia.verification_status === 'verified' 
                      ? 'success' 
                      : pia.verification_status === 'pending' 
                      ? 'warning' 
                      : 'destructive'
                  }
                >
                  {pia.verification_status}
                </Badge>
              </TableCell>
              <TableCell>
                {pia.average_rating ? `${pia.average_rating} (${pia.total_reviews})` : 'No ratings'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
