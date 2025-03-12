
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingNavigation from "@/components/landing/LandingNavigation";
import { HandHeart, Briefcase, GraduationCap, Calendar, BadgeCheck } from "lucide-react";

export default function CaregiverLanding() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      title: "Competitive Pay",
      description: "Earn what you deserve with transparent, competitive compensation"
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      title: "Flexible Schedule",
      description: "Choose hours that work for you and maintain work-life balance"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      title: "Professional Growth",
      description: "Access training and certification opportunities"
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-purple-600" />,
      title: "Recognition",
      description: "Build your reputation with verified reviews and badges"
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
              Make a Difference as a Professional Caregiver
            </h1>
            <p className="text-xl text-gray-700">
              Join em.path to find meaningful caregiving opportunities, earn competitive pay, and grow your career while making a real difference in people's lives.
            </p>
            <Button 
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => navigate('/auth?type=caregiver')}
            >
              <HandHeart className="mr-2 h-5 w-5" />
              Join as a Caregiver
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(20).jpg" 
                alt="Caregiver and client sharing a moment"
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
            Why Choose em.path?
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
