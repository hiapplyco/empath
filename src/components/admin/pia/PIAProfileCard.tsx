
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Phone, Mail, Languages, Clock, DollarSign } from "lucide-react";
import { LocationsDisplay } from "@/components/profile/variants/LocationsDisplay";

interface PIAProfileCardProps {
  pia: {
    id: string;
    name: string;
    license_type?: string[];
    status?: string;
    verification_status?: string;
    languages?: string[];
    locations_serviced?: string[];
    hourly_rate?: string;
    years_experience?: string;
    phone_number?: string;
    email?: string;
    bio?: string;
  };
}

export const PIAProfileCard = ({ pia }: PIAProfileCardProps) => {
  // Format hourly rate to ensure consistent display
  const formattedRate = pia.hourly_rate 
    ? `$${parseFloat(pia.hourly_rate).toFixed(2)}/hr`
    : 'Rate not specified';
    
  // Format bio text by replacing \n with actual line breaks and trimming extra spaces
  const formattedBio = pia.bio?.split('\\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold mb-3">{pia.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {pia.license_type?.map((license) => (
                <Badge key={license} variant="outline" className="text-sm font-medium">
                  {license}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {pia.status && (
              <Badge variant={pia.status === 'active' ? 'default' : 'secondary'}>
                {pia.status}
              </Badge>
            )}
            {pia.verification_status && (
              <Badge 
                variant={
                  pia.verification_status === 'verified' 
                    ? 'default' 
                    : pia.verification_status === 'pending' 
                    ? 'secondary' 
                    : 'destructive'
                }
              >
                {pia.verification_status}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {formattedBio && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {formattedBio}
            </p>
          </div>
        )}
        
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5 text-primary/70" />
                <span className="font-medium">{formattedRate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-primary/70" />
                <span className="font-medium">
                  {pia.years_experience 
                    ? `${pia.years_experience} years experience`
                    : 'Experience not specified'}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {pia.phone_number && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-5 h-5 text-primary/70" />
                  <span className="font-medium">{pia.phone_number}</span>
                </div>
              )}
              {pia.email && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5 text-primary/70" />
                  <span className="font-medium">{pia.email}</span>
                </div>
              )}
            </div>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
};

