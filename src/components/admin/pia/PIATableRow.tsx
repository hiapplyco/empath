
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PIAProfileCard } from "./PIAProfileCard";

interface PIA {
  id: string;
  name: string;
  status?: string;
  years_experience?: string;
  hourly_rate?: string;
  locations_serviced?: string[];
  services_provided?: string[];
  languages?: string[];
  verification_status?: string;
  phone_number?: string;
  email?: string;
}

interface PIATableRowProps {
  pia: PIA;
  onViewProfile: (id: string) => void;
}

export const PIATableRow = ({ pia, onViewProfile }: PIATableRowProps) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <TableRow 
        onClick={() => setShowProfile(true)}
        className="group hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:shadow-md"
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
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
              <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded group-hover:bg-blue-100 transition-colors">
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
              <span key={i} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded group-hover:bg-purple-100 transition-colors">
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
      </TableRow>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">PIA Profile</DialogTitle>
          </DialogHeader>
          <PIAProfileCard pia={pia} />
        </DialogContent>
      </Dialog>
    </>
  );
};
