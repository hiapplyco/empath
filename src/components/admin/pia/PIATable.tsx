
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { Table, TableBody } from "@/components/ui/table";
import { PIATableFilters } from './PIATableFilters';
import { PIATableHeader } from './PIATableHeader';
import { PIATableRow } from './PIATableRow';
import { usePIAData } from '@/hooks/use-pia-data';
import { toast } from 'sonner';

export const PIATable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();

  const { data: pias, isLoading, error } = usePIAData({
    searchTerm: debouncedSearch,
    sortField,
    sortOrder,
  });

  if (error) {
    // If unauthorized, redirect to admin auth
    if (error.message?.includes('JWTClaimsError') || error.message?.includes('not authorized')) {
      toast.error('Please sign in to access this page');
      navigate('/admin/auth');
      return null;
    }
    return (
      <div className="p-8 text-center text-red-600">
        Error loading data: {error.message}
      </div>
    );
  }

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
            {isLoading ? (
              <tr>
                <td colSpan={9} className="p-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">Loading caregivers...</div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {pias?.map((pia) => (
                  <PIATableRow
                    key={pia.id}
                    pia={pia}
                    onViewProfile={handleViewProfile}
                  />
                ))}
                {(!pias || pias.length === 0) && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No professional aides found
                    </td>
                  </tr>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
