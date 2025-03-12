import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-heading-1 text-gray-900 leading-tight max-w-xl">
              Care that <span className="text-brand-purple-600">connects</span> on a human level
            </h1>
            <p className="text-body-large text-gray-700 max-w-lg">
              em.path brings caregivers and care recipients together through empathy, understanding, and support—creating relationships that truly matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                className="h-12 px-8 text-[16px] font-medium bg-brand-purple-600 hover:bg-brand-purple-700 text-white rounded-xl shadow-soft transition-all hover:shadow-medium"
                onClick={() => navigate('/for-care-seekers')}
              >
                I need a caregiver
              </Button>
              <Button 
                variant="outline" 
                className="h-12 px-8 text-[16px] font-medium border-2 border-brand-purple-600 text-brand-purple-700 hover:bg-brand-purple-50 rounded-xl"
                onClick={() => navigate('/for-caregivers')}
              >
                I'm a caregiver
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-card transform hover:scale-[1.01] transition-transform duration-300">
              <img 
                src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(20).jpg"
                alt="Caregiver and client sharing a moment"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
