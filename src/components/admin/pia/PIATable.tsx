
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
import { Search, ArrowUpDown, Filter, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';

export const PIATable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300); // Debounce search input
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();

  const { data: pias, isLoading } = useQuery({
    queryKey: ['pias', debouncedSearch, sortField, sortOrder],
    queryFn: async () => {
      let query = supabase
        .from('professional_independent_aides')
        .select('*');

      if (debouncedSearch) {
        query = query.or(
          `name.ilike.%${debouncedSearch}%,` +
          `email.ilike.%${debouncedSearch}%,` +
          `locations_serviced.cs.{${debouncedSearch}},` +
          `services_provided.cs.{${debouncedSearch}}`
        );
      }

      const { data, error } = await query.order(sortField, { ascending: sortOrder === 'asc' });

      if (error) throw error;
      return data;
    },
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading caregivers...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Professional Independent Aides</h2>
          <p className="text-gray-500 mt-1">Manage and view all registered caregivers</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead onClick={() => handleSort('years_experience')} className="cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  Experience
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('hourly_rate')} className="cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  Rate
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pias?.map((pia) => (
              <TableRow 
                key={pia.id} 
                className="group hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      {pia.name?.charAt(0).toUpperCase()}
                    </div>
                    {pia.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pia.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pia.status}
                  </span>
                </TableCell>
                <TableCell>{pia.years_experience}</TableCell>
                <TableCell>{pia.hourly_rate}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pia.locations_serviced?.slice(0, 2).map((location, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                        {location}
                      </span>
                    ))}
                    {(pia.locations_serviced?.length || 0) > 2 && (
                      <span className="text-xs text-gray-500">
                        +{(pia.locations_serviced?.length || 0) - 2} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pia.services_provided?.slice(0, 2).map((service, i) => (
                      <span key={i} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {(pia.services_provided?.length || 0) > 2 && (
                      <span className="text-xs text-gray-500">
                        +{(pia.services_provided?.length || 0) - 2} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {pia.languages?.join(", ")}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pia.verification_status === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pia.verification_status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/pia/${pia.id}`)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
