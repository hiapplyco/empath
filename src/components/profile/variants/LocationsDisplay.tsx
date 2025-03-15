
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
        >
          <MapPin className="mr-1 h-4 w-4" />
          {location}
        </Button>
      ))}
    </div>
  );
};
