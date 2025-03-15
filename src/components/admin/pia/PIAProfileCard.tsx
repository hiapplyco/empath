
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Phone, Mail, Languages, Award, Clock, DollarSign } from "lucide-react";

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
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{pia.name}</h3>
            <div className="flex gap-2 mt-1">
              {pia.license_type?.map((license) => (
                <Badge key={license} variant="outline" className="text-xs">
                  {license}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={pia.status === 'active' ? 'default' : 'secondary'}
            >
              {pia.status}
            </Badge>
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {pia.bio && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-sm italic">{pia.bio}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Languages className="w-4 h-4" />
            <span>{pia.languages?.join(', ') || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{pia.locations_serviced?.join(', ') || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>{pia.hourly_rate || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{pia.years_experience} years experience</span>
          </div>
          {pia.phone_number && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{pia.phone_number}</span>
            </div>
          )}
          {pia.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{pia.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
