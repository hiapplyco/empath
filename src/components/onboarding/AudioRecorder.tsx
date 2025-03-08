import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AudioRecorderProps {
  onComplete: () => void;
}

export const AudioRecorder = ({ onComplete }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement audio recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Implement stopping and uploading recording
    setTimeout(() => {
      navigate('/dashboard/profile');
    }, 1000);
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-gray-600 mb-4">
        Record a brief introduction about yourself and your caregiving experience
      </p>
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
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
};
