
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthRequirement = async () => {
      // List of paths that require authentication
      const authRequiredPaths = [
        '/dashboard',
        '/onboarding',
        '/care-seeker/dashboard',
        '/care-seeker/profile',
        '/care-seeker/onboarding',
        '/onboarding/documents',
        '/onboarding/profile'
      ];

      // Check if current path starts with any auth-required path
      const requiresAuth = authRequiredPaths.some(path => 
        location.pathname.startsWith(path)
      );

      if (requiresAuth) {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("Auth required for this route. Redirecting to auth page.");
          
          // Determine if this is a caregiver or care-seeker path
          const isCaregiverPath = location.pathname.includes('/dashboard') || 
            location.pathname.includes('/onboarding');
          
          const isCareSeekerPath = location.pathname.includes('/care-seeker');
          
          // Redirect to appropriate auth page
          if (isCareSeekerPath) {
            navigate('/auth/care-seeker');
          } else if (isCaregiverPath) {
            navigate('/auth/caregiver');
          } else {
            // Default to caregiver auth if unclear
            navigate('/auth/caregiver');
          }
          
          return;
        }
      }
      
      // If we get here, it's a genuine 404
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    };
    
    checkAuthRequirement();
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
