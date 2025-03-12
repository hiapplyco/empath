
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingNavigation() {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
  };

  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/empath-simple-logo.svg" alt="em.path logo" className="w-8 h-8 mr-2" />
        <span className="text-2xl font-bold text-purple-800">em.path</span>
      </div>
      <div className="hidden md:flex space-x-6 text-purple-800">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/for-caregivers')} 
          className="hover:text-purple-600 transition-colors"
        >
          For Caregivers
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/for-care-seekers')} 
          className="hover:text-purple-600 transition-colors"
        >
          For Care Seekers
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#testimonials')} 
          className="hover:text-purple-600 transition-colors"
        >
          Stories
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#about')} 
          className="hover:text-purple-600 transition-colors"
        >
          About Us
        </Button>
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
