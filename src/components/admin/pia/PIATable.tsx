import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody } from "@/components/ui/table";
import { PIATableFilters } from './PIATableFilters';
import { PIATableHeader } from './PIATableHeader';
import { PIATableRow } from './PIATableRow';
import { usePIAData } from '@/hooks/use-pia-data';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

export const PIATable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();

  const { data: pias, isLoading, error } = usePIAData({
    searchTerm,
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

  const handleViewProfile = (piaId: string) => {
    navigate(`/dashboard/admin/pia/${piaId}`);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      <PIATableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
      />

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <PIATableHeader onSort={setSortField} />
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-8">
                  <div className="flex items-center justify-center text-gray-500 gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading caregivers...</span>
                  </div>
                </td>
              </tr>
            ) : pias && pias.length > 0 ? (
              pias.map((pia) => (
                <PIATableRow
                  key={pia.id}
                  pia={pia}
                  onViewProfile={handleViewProfile}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  {searchTerm ? (
                    <>No caregivers found matching "{searchTerm}"</>
                  ) : (
                    <>No caregivers found</>
                  )}
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
