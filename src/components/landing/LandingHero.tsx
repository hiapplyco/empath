
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
  };

  return (
    <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight">
          Care that <span className="text-purple-600">connects</span> on a human level
        </h1>
        <p className="text-lg text-gray-700">
          em.path brings caregivers and care recipients together through empathy, understanding, and support—creating relationships that truly matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="flex flex-col items-center">
            <Button 
              className="bg-gray-300 hover:bg-gray-300 cursor-not-allowed text-gray-600 py-6 px-8 rounded-xl shadow-md"
              disabled
            >
              I need a caregiver
            </Button>
            <span className="text-sm text-gray-500 mt-1">Coming soon</span>
          </div>
          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-700 hover:bg-purple-50 py-6 px-8 rounded-xl"
            onClick={handleAuthNavigation}
          >
            I'm a caregiver
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg h-80">
        <img 
          src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(20).jpg"
          alt="Caregiver and client sharing a moment"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
