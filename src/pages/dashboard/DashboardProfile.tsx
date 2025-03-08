
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ProfileSection } from "@/components/profile/CaregiverProfileCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Calendar, Hospital, Shield, Clock } from "lucide-react";

const DashboardProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data: profileData } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .single();

      const { data: certifications } = await supabase
        .from('certifications')
        .select('*');

      return {
        ...profileData,
        certifications
      };
    },
  });

  if (isLoading || !profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-[200px] animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <ProfileSection title="Personal Information" onEdit={() => console.log('Edit personal info')}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{profile.contact_info?.phone || 'No phone'}</p>
              <p className="font-medium">{profile.contact_info?.email || 'No email'}</p>
            </div>
          </div>
          {profile.bio && (
            <div>
              <p className="text-sm text-gray-500">Bio</p>
              <p className="font-medium">{profile.bio}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.languages?.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="Experience & Skills" onEdit={() => console.log('Edit experience')}>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Years of Experience</p>
            <p className="font-medium">{profile.years_experience} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ProfileSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection title="Certifications" onEdit={() => console.log('Edit certifications')}>
          <div className="space-y-2">
            {profile.certifications?.map((cert) => (
              <div key={cert.id} className="flex items-center text-green-600">
                <BadgeCheck className="h-5 w-5 mr-2" />
                <span>{cert.name} - {cert.status}</span>
              </div>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Availability" onEdit={() => console.log('Edit availability')}>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              <span>Status: {profile.available ? 'Available' : 'Unavailable'}</span>
            </div>
            {profile.availability_details?.shift_types?.map((shift) => (
              <div key={shift} className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span>{shift}</span>
              </div>
            ))}
          </div>
        </ProfileSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection title="Patient Types" onEdit={() => console.log('Edit patient types')}>
          <div className="space-y-2">
            {profile.patient_types?.map((type, index) => (
              <div key={index} className="flex items-center">
                <Hospital className="h-5 w-5 mr-2 text-purple-500" />
                <span>{type.patient_type}</span>
              </div>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Equipment & Emergency" onEdit={() => console.log('Edit equipment')}>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Equipment Skills</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.equipment_skills?.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergency Protocols</p>
              {profile.emergency_protocols?.map((protocol, index) => (
                <div key={index} className="flex items-center mt-1">
                  <Shield className="h-5 w-5 mr-2 text-red-500" />
                  <span>{protocol.scenario}</span>
                </div>
              ))}
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default DashboardProfile;
