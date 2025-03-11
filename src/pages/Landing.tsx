
import { Calendar, Award, Shield, MessageCircle, ArrowRight } from "lucide-react";
import LandingNavigation from "@/components/landing/LandingNavigation";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingCaregivers from "@/components/landing/LandingCaregivers";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingFooter from "@/components/landing/LandingFooter";
import DashboardShowcase from "@/components/landing/showcase/DashboardShowcase";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white font-sans">
      <LandingNavigation />
      <LandingHero />
      <LandingFeatures />
      <DashboardShowcase />
      <LandingHowItWorks />
      <LandingCaregivers />
      <LandingTestimonials />
      <LandingFooter />
    </div>
  );
}
