
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Phone, Mail, Languages, Clock, DollarSign, Award, Briefcase, Heart, Shield, BookOpen, Syringe } from "lucide-react";
import { LocationsDisplay } from "@/components/profile/variants/LocationsDisplay";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    education?: string[];
    available_shifts?: string;
    services_provided?: string[];
    pet_preferences?: string[];
    background_check?: string;
    hca_registry_id?: string;
    hca_expiration_date?: string;
    vaccinations?: string[];
  };
}

export const PIAProfileCard = ({ pia }: PIAProfileCardProps) => {
  const formattedRate = pia.hourly_rate 
    ? `$${parseFloat(pia.hourly_rate).toFixed(2)}/hr`
    : 'Rate not specified';
    
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
      <CardContent className="space-y-6">
        {/* Bio Section */}
        {formattedBio && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {formattedBio}
            </p>
          </div>
        )}

        {/* Basic Information */}
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

        {/* Languages and Locations */}
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

        {/* Detailed Information Sections */}
        <div className="space-y-4">
          {/* Certifications & Education */}
          <Collapsible className="border rounded-lg p-2">
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <BookOpen className="w-5 h-5 text-primary/70" />
              <span className="font-semibold">Education & Certifications</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {pia.education && (
                <div className="space-y-2">
                  <h4 className="font-medium">Education</h4>
                  <div className="flex flex-wrap gap-2">
                    {pia.education.map((edu, i) => (
                      <Badge key={i} variant="outline">{edu}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h4 className="font-medium">HCA Registry Information</h4>
                <p className="text-sm">ID: {pia.hca_registry_id || 'Not provided'}</p>
                <p className="text-sm">Expiration: {pia.hca_expiration_date || 'Not provided'}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Services & Availability */}
          <Collapsible className="border rounded-lg p-2">
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <Briefcase className="w-5 h-5 text-primary/70" />
              <span className="font-semibold">Services & Availability</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {pia.services_provided && (
                <div className="space-y-2">
                  <h4 className="font-medium">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {pia.services_provided.map((service, i) => (
                      <Badge key={i} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {pia.available_shifts && (
                <div className="space-y-2">
                  <h4 className="font-medium">Available Shifts</h4>
                  <p className="text-sm">{pia.available_shifts}</p>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Additional Information */}
          <Collapsible className="border rounded-lg p-2">
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <Heart className="w-5 h-5 text-primary/70" />
              <span className="font-semibold">Additional Information</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {pia.pet_preferences && (
                <div className="space-y-2">
                  <h4 className="font-medium">Pet Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {pia.pet_preferences.map((pref, i) => (
                      <Badge key={i} variant="outline">{pref}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Verification & Background */}
          <Collapsible className="border rounded-lg p-2">
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <Shield className="w-5 h-5 text-primary/70" />
              <span className="font-semibold">Verification & Safety</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {pia.background_check && (
                <div className="space-y-2">
                  <h4 className="font-medium">Background Check</h4>
                  <p className="text-sm">{pia.background_check}</p>
                </div>
              )}
              {pia.vaccinations && (
                <div className="space-y-2">
                  <h4 className="font-medium">Vaccinations</h4>
                  <div className="flex flex-wrap gap-2">
                    {pia.vaccinations.map((vax, i) => (
                      <Badge key={i} variant="outline">{vax}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};
