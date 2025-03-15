
import { Badge } from "@/components/ui/badge";
import { Languages, MapPin } from "lucide-react";
import { LocationsDisplay } from "@/components/profile/variants/LocationsDisplay";

interface LanguagesLocationsSectionProps {
  languages?: string[];
  locations_serviced?: string[];
}

export const LanguagesLocationsSection = (props: LanguagesLocationsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Languages className="w-5 h-5 text-primary/70 mt-1" />
        <div className="flex flex-wrap gap-2">
          {props.languages?.map(language => (
            <Badge key={language} variant="secondary" className="text-sm">
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 text-primary/70 mt-1" />
        <div className="flex-1">
          {props.locations_serviced && <LocationsDisplay locations={props.locations_serviced} />}
        </div>
      </div>
    </div>
  );
};
