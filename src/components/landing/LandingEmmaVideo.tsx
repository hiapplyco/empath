
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

export default function LandingEmmaVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-purple-50/50 to-white py-20">
      <div className="container mx-auto px-6">
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
            poster="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets/emma.png"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
