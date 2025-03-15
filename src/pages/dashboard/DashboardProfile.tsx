
import { useAuthenticatedPIAProfile } from "@/hooks/use-pia-data";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileSection } from "@/components/profile/types";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const DashboardProfile = () => {
  const { data: profile, isLoading, error } = useAuthenticatedPIAProfile();

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-center text-red-500">Error loading profile: {error.message}</p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No profile data found. Please contact support.</p>
      </Card>
    );
  }

  const sections: ProfileSection[] = [
    {
      title: "Personal Information",
      variant: "grid",
      items: [
        { label: "Name", value: profile.name || "Not provided" },
        { label: "Email", value: profile.email || "Not provided" },
        { label: "Phone", value: profile.phone_number || "Not provided" },
        { label: "Years of Experience", value: profile.years_experience || "Not provided" },
        { label: "Hourly Rate", value: profile.hourly_rate || "Not provided" },
      ]
    },
    {
      title: "Professional Details",
      variant: "badges",
      items: [
        { label: "License Type", value: profile.license_type?.join(", ") || "Not provided" },
        { label: "HCA Registry ID", value: profile.hca_registry_id || "Not provided" },
        { label: "HCA Expiration", value: profile.hca_expiration_date || "Not provided" },
        { label: "Background Check", value: profile.background_check || "Not provided" }
      ]
    },
    {
      title: "Skills & Qualifications",
      variant: "badges",
      items: [
        { label: "Services", value: profile.services_provided?.join(", ") || "Not provided" },
        { label: "Languages", value: profile.languages?.join(", ") || "Not provided" },
        { label: "Education", value: profile.education?.join(", ") || "Not provided" },
        { label: "Vaccinations", value: profile.vaccinations?.join(", ") || "Not provided" }
      ]
    },
    {
      title: "Availability & Preferences",
      variant: "grid",
      items: [
        { label: "Available Shifts", value: profile.available_shifts || "Not provided" },
        { 
          label: "Locations", 
          value: profile.locations_serviced?.map(location => (
            <Button
              key={location}
              variant="outline"
              size="sm"
              className="mr-2 mb-2"
            >
              <MapPin className="mr-1 h-4 w-4" />
              {location}
            </Button>
          )) || "Not provided"
        },
        { label: "Pet Preferences", value: profile.pet_preferences?.join(", ") || "Not provided" }
      ]
    },
    {
      title: "About Me",
      variant: "list",
      items: [
        { label: "Bio", value: profile.bio || "No bio provided" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <DynamicProfileSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default DashboardProfile;
