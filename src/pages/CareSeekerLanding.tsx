
import { useNavigate } from "react-router-dom";
import LandingNavigation from "@/components/landing/LandingNavigation";
import HeroSection from "@/components/care-seeker/landing/HeroSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function CareSeekerLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <LandingNavigation />
      <HeroSection />
      <LandingFooter />
    </div>
  );
}
