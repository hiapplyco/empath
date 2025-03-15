
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from 'react';

export const PIATable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: pias, isLoading } = useQuery({
    queryKey: ['pias', searchTerm],
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Professional Independent Aides</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search caregivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Verification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pias?.map((pia) => (
              <TableRow key={pia.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{pia.name}</TableCell>
                <TableCell>{pia.status}</TableCell>
                <TableCell>{pia.years_experience} years</TableCell>
                <TableCell>{pia.hourly_rate}</TableCell>
                <TableCell>{pia.locations_serviced?.join(", ")}</TableCell>
                <TableCell>{pia.services_provided?.join(", ")}</TableCell>
                <TableCell>{pia.languages?.join(", ")}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pia.verification_status === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pia.verification_status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
