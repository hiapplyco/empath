
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-purple-50 via-white to-white py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight">
              Find the Perfect Caregiver Who Truly Connects
            </h1>
            <p className="text-xl text-gray-700 max-w-lg">
              Discover compassionate, qualified caregivers who provide personalized care tailored to your loved one's unique needs, preferences, and personality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                asChild
              >
                <Link to="/auth/care-seeker">
                  Find Your Match
                </Link>
              </Button>
              <Button 
                variant="ghost"
                size="lg"
                className="text-purple-700 hover:bg-purple-50"
                asChild
              >
                <Link to="#how-it-works" className="flex items-center gap-2">
                  How It Works
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>93% match rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Average match time: 48 hours</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(20).jpg" 
                alt="Caring moment between caregiver and senior"
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
