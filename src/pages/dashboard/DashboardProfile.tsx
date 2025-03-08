import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ProfileSection } from "@/components/profile/CaregiverProfileCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, BadgeCheck, Calendar, Hospital, Shield, Clock } from "lucide-react";

const DashboardProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .single();
      return data;
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
              <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{profile?.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="Experience & Specialties" onEdit={() => console.log('Edit experience')}>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Years of Experience</p>
            <p className="font-medium">{profile?.years_experience || 0} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {['Geriatric Care', 'Dementia Care'].map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ProfileSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection title="Certifications & Training" onEdit={() => console.log('Edit certifications')}>
          <div className="space-y-2">
            <div className="flex items-center text-green-600">
              <BadgeCheck className="h-5 w-5 mr-2" />
              <span>CPR Certified</span>
            </div>
            <div className="flex items-center text-green-600">
              <BadgeCheck className="h-5 w-5 mr-2" />
              <span>First Aid Certified</span>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Availability" onEdit={() => console.log('Edit availability')}>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              <span>Status: {profile?.status || 'Not set'}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              <span>{profile?.weekly_hours || 0} hours/week</span>
            </div>
          </div>
        </ProfileSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection title="Patient Care Details" onEdit={() => console.log('Edit patient care')}>
          <div className="space-y-2">
            <div className="flex items-center">
              <Hospital className="h-5 w-5 mr-2 text-purple-500" />
              <span>Chronic Disease Management</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-purple-500" />
              <span>Post-Surgery Recovery</span>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Legal & Compliance" onEdit={() => console.log('Edit compliance')}>
          <div className="space-y-2">
            <div className="flex items-center text-green-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center text-yellow-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>Background Check Pending</span>
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default DashboardProfile;
