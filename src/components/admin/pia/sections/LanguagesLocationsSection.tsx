
import { Badge } from "@/components/ui/badge";
import { Languages, MapPin } from "lucide-react";
import { LocationsDisplay } from "@/components/profile/variants/LocationsDisplay";

interface LanguagesLocationsSectionProps {
  pia: {
    languages?: string[];
    locations_serviced?: string[];
  };
}

export const LanguagesLocationsSection = ({ pia }: LanguagesLocationsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Languages className="w-5 h-5 text-primary/70 mt-1" />
        <div className="flex flex-wrap gap-2">
          {pia.languages?.map(language => (
            <Badge key={language} variant="secondary" className="text-sm">
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 text-primary/70 mt-1" />
        <div className="flex-1">
          {pia.locations_serviced && <LocationsDisplay locations={pia.locations_serviced} />}
        </div>
      </div>
    </div>
  );
};
