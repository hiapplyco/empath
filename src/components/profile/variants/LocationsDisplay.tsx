
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationsDisplayProps {
  locations: string[];
}

export const LocationsDisplay = ({ locations }: LocationsDisplayProps) => {
  if (!locations?.length) return <span>Not provided</span>;
  
  return (
    <div className="flex flex-wrap gap-2">
      {locations.map(location => (
        <Button
          key={location}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-50"
        >
          <MapPin className="mr-1 h-4 w-4 text-primary/70" />
          {location}
        </Button>
      ))}
    </div>
  );
};
