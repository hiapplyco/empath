
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface PIATableHeaderProps {
  onSort: (field: string) => void;
}

export const PIATableHeader = ({ onSort }: PIATableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead onClick={() => onSort('name')} className="cursor-pointer hover:bg-gray-100">
          <div className="flex items-center gap-2">
            Name
            <ArrowUpDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead onClick={() => onSort('years_experience')} className="cursor-pointer hover:bg-gray-100">
          <div className="flex items-center gap-2">
            Experience
            <ArrowUpDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('hourly_rate')} className="cursor-pointer hover:bg-gray-100">
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
  );
};
