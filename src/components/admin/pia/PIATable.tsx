
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { Table, TableBody } from "@/components/ui/table";
import { PIATableFilters } from './PIATableFilters';
import { PIATableHeader } from './PIATableHeader';
import { PIATableRow } from './PIATableRow';
import { usePIAData } from '@/hooks/use-pia-data';

export const PIATable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();

  const { data: pias, isLoading } = usePIAData({
    searchTerm: debouncedSearch,
    sortField,
    sortOrder,
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleViewProfile = (piaId: string) => {
    navigate(`/dashboard/admin/pia/${piaId}`);
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
      <PIATableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <PIATableHeader onSort={handleSort} />
          <TableBody>
            {pias?.map((pia) => (
              <PIATableRow
                key={pia.id}
                pia={pia}
                onViewProfile={handleViewProfile}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
