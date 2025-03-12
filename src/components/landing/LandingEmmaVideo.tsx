
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

export default function LandingEmmaVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-purple-50/50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Meet Emma, Your Care Companion
          </h2>
          <p className="text-lg text-gray-700">
            Em.path connects caregivers and care recipients through meaningful, personality-based matching rather than just credentials and availability. Our conversational platform understands the whole person—their needs, preferences, and values—creating care relationships built on genuine connection.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
              <Button
                onClick={() => setIsPlaying(true)}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20"
              >
                <PlayCircle className="h-16 w-16" />
              </Button>
            </div>
          )}
          <video
            className="w-full rounded-2xl aspect-video object-cover"
            src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//ff8f693ff5.mp4"
            controls={isPlaying}
            poster="/lovable-uploads/ec9ba971-3fb5-478c-a19a-c58acc2eb329.png"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto">
          Whether you're seeking compassionate care or offering your caregiving skills, em.path helps you find the perfect match while providing tools to manage schedules, track certifications, and build community.
        </p>
      </div>
    </section>
  );
}
