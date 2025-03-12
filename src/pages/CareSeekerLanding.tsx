
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingNavigation from "@/components/landing/LandingNavigation";
import { Heart, Users, Search, BadgeCheck } from "lucide-react";

export default function CareSeekerLanding() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Perfect Match",
      description: "Find caregivers who truly understand your unique needs"
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-purple-600" />,
      title: "Verified Caregivers",
      description: "Every caregiver is thoroughly vetted and background-checked"
    },
    {
      icon: <Search className="h-6 w-6 text-purple-600" />,
      title: "Intelligent Matching",
      description: "Our AI helps find the most compatible caregivers for you"
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600" />,
      title: "Compassionate Care",
      description: "Experience care that's focused on empathy and understanding"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <LandingNavigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight">
              Find the Perfect Caregiver for Your Loved One
            </h1>
            <p className="text-xl text-gray-700">
              Connect with compassionate, qualified caregivers who will provide personalized care that meets your unique needs and preferences.
            </p>
            <Button 
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => navigate('/auth?type=care-seeker')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Find a Caregiver
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(21).jpg" 
                alt="Caring moment between caregiver and senior"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
            Why Families Choose em.path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
