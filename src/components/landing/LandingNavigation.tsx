
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingNavigation() {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
  };

  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-2">
          <Heart className="text-white w-5 h-5" />
        </div>
        <span className="text-2xl font-bold text-purple-800">em.path</span>
      </div>
      <div className="hidden md:flex space-x-6 text-purple-800">
        <a href="#how-it-works" className="hover:text-purple-600 transition-colors">How It Works</a>
        <a href="#for-caregivers" className="hover:text-purple-600 transition-colors">For Caregivers</a>
        <a href="#testimonials" className="hover:text-purple-600 transition-colors">Stories</a>
        <a href="#about" className="hover:text-purple-600 transition-colors">About Us</a>
      </div>
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className="border-purple-600 text-purple-700 hover:bg-purple-50"
          onClick={handleAuthNavigation}
        >
          Log in
        </Button>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleAuthNavigation}
        >
          Sign up
        </Button>
      </div>
    </nav>
  );
}
