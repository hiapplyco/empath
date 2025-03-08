
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Square } from "lucide-react";

interface VideoRecorderProps {
  onComplete: () => void;
}

export const VideoRecorder = ({ onComplete }: VideoRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement video recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Implement stopping and uploading recording
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-gray-600 mb-4">
        Record a brief video introduction about yourself and your caregiving experience
      </p>
      <div className="aspect-video bg-gray-100 rounded-lg mb-4">
        {/* Video preview will go here */}
      </div>
      <Button
        variant={isRecording ? "destructive" : "default"}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className="w-full"
      >
        {isRecording ? (
          <>
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Video className="mr-2 h-4 w-4" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
};
