
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";

interface PIATableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
}

export const PIATableFilters = ({ 
  searchTerm, 
  onSearchChange,
  isLoading 
}: PIATableFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Professional Independent Aides</h2>
        <p className="text-gray-500 mt-1">Manage and view all registered caregivers</p>
      </div>
      <div className="flex gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
          )}
          <Input
            placeholder="Search by name, email, location..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10 pr-10 bg-white border-gray-200"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
};
