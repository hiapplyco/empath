
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingNavigation from "@/components/landing/LandingNavigation";
import { HandHeart, ArrowRight, Wallet, Calendar, GraduationCap, Users, ClipboardList, Shield } from "lucide-react";
import LandingFooter from "@/components/landing/LandingFooter";
import DashboardShowcase from "@/components/landing/showcase/DashboardShowcase";

export default function CaregiverLanding() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Wallet className="h-6 w-6 text-purple-600" />,
      title: "Higher Earnings",
      description: "Set your own competitive rates and earn 30% more than traditional agencies"
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      title: "Flexible Scheduling",
      description: "Work when and how much you want on your own terms"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      title: "Professional Growth",
      description: "Access continuing education and certification support"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Supportive Community",
      description: "Connect with fellow caregivers for mentorship and support"
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-purple-600" />,
      title: "Simplified Admin",
      description: "Less paperwork, more time for what matters—providing care"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Secure Platform",
      description: "Protected payments and verified client connections"
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
              Build Your Caregiving Career With Purpose
            </h1>
            <p className="text-xl text-gray-700">
              Join a platform that values your skills, connects you with compatible clients, and supports your professional growth—all while giving you control over your schedule and rates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/auth/caregiver')}
              >
                <HandHeart className="mr-2 h-5 w-5" />
                Join as a Caregiver
              </Button>
              <Button 
                variant="ghost"
                size="lg"
                className="text-purple-700 hover:bg-purple-50"
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>How em.path Works</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>95% caregiver satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>30% higher earnings</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <DashboardShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
            Why Caregivers Choose em.path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
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

      <LandingFooter />
    </div>
  );
}
