
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Briefcase, Heart, Shield } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { LanguagesLocationsSection } from "./sections/LanguagesLocationsSection";

export interface PIAProfileCardProps {
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
}

export const PIAProfileCard = (props: PIAProfileCardProps) => {
  const formattedBio = props.bio?.split('\\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-purple-900">{props.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {props.license_type?.map((license) => (
                <Badge key={license} variant="outline" className="text-sm font-medium bg-purple-50">
                  {license}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {props.status && (
              <Badge 
                variant={props.status === 'active' ? 'default' : 'secondary'}
                className="animate-fade-in"
              >
                {props.status}
              </Badge>
            )}
            {props.verification_status && (
              <Badge 
                variant={
                  props.verification_status === 'verified' 
                    ? 'default' 
                    : props.verification_status === 'pending' 
                    ? 'secondary' 
                    : 'destructive'
                }
                className="animate-fade-in"
              >
                {props.verification_status}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bio Section */}
        {formattedBio && (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {formattedBio}
            </p>
          </div>
        )}

        {/* Basic Information */}
        <BasicInfoSection 
          hourly_rate={props.hourly_rate}
          years_experience={props.years_experience}
          phone_number={props.phone_number}
          email={props.email}
        />

        {/* Languages and Locations */}
        <LanguagesLocationsSection 
          languages={props.languages}
          locations_serviced={props.locations_serviced}
        />

        {/* Detailed Information Sections */}
        <div className="space-y-4">
          {/* Certifications & Education */}
          <Collapsible className="border rounded-lg p-2">
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded">
              <BookOpen className="w-5 h-5 text-primary/70" />
              <span className="font-semibold">Education & Certifications</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              {props.education && (
                <div className="space-y-2">
                  <h4 className="font-medium">Education</h4>
                  <div className="flex flex-wrap gap-2">
                    {props.education.map((edu, i) => (
                      <Badge key={i} variant="outline">{edu}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h4 className="font-medium">HCA Registry Information</h4>
                <p className="text-sm">ID: {props.hca_registry_id || 'Not provided'}</p>
                <p className="text-sm">Expiration: {props.hca_expiration_date || 'Not provided'}</p>
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
              {props.services_provided && (
                <div className="space-y-2">
                  <h4 className="font-medium">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {props.services_provided.map((service, i) => (
                      <Badge key={i} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {props.available_shifts && (
                <div className="space-y-2">
                  <h4 className="font-medium">Available Shifts</h4>
                  <p className="text-sm">{props.available_shifts}</p>
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
              {props.pet_preferences && (
                <div className="space-y-2">
                  <h4 className="font-medium">Pet Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {props.pet_preferences.map((pref, i) => (
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
              {props.background_check && (
                <div className="space-y-2">
                  <h4 className="font-medium">Background Check</h4>
                  <p className="text-sm">{props.background_check}</p>
                </div>
              )}
              {props.vaccinations && (
                <div className="space-y-2">
                  <h4 className="font-medium">Vaccinations</h4>
                  <div className="flex flex-wrap gap-2">
                    {props.vaccinations.map((vax, i) => (
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
