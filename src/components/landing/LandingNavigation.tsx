import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function LandingNavigation() {
  const navigate = useNavigate();

  const handleAuthNavigation = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (session?.user) {
      // First check if user is admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (adminData) {
        navigate('/admin/dashboard');
        return;
      }

      // Then check if user has a caregiver profile
      const { data: caregiverData } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (caregiverData) {
        navigate('/dashboard');
        return;
      }

      // Finally check if user is a care seeker
      const { data: careSeekerData } = await supabase
        .from('care_seeker_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (careSeekerData) {
        navigate('/care-seeker/dashboard');
        return;
      }

      // If no role is found, default to caregiver auth
      navigate('/auth/caregiver');
    } else {
      navigate('/auth/caregiver');
    }
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
          onClick={() => navigate('/stories')} 
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
