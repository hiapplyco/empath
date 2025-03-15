
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface PIATableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const PIATableFilters = ({ searchTerm, onSearchChange }: PIATableFiltersProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-gray-200"
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
