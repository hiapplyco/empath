
import { Button } from "@/components/ui/button";
import { Mic, Camera, StopCircle, MonitorUp } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  onRecordingChange: (recording: boolean) => void;
  onVideoChange: (enabled: boolean) => void;
  onScreenShareChange: (sharing: boolean) => void;
}

export const Controls = ({
  isRecording,
  isVideoEnabled,
  isScreenSharing,
  onRecordingChange,
  onVideoChange,
  onScreenShareChange
}: ControlsProps) => {
  return (
    <div className="border-t p-4 flex items-center gap-4 bg-white">
      <Button
        variant={isRecording ? "destructive" : "default"}
        onClick={() => onRecordingChange(!isRecording)}
        className="flex items-center gap-2"
      >
        {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isRecording ? "Stop" : "Start"} Speaking
      </Button>

      <Button
        variant={isVideoEnabled ? "destructive" : "secondary"}
        onClick={() => onVideoChange(!isVideoEnabled)}
        className="flex items-center gap-2"
      >
        <Camera className="h-4 w-4" />
        {isVideoEnabled ? "Stop" : "Start"} Video
      </Button>

      <Button
        variant={isScreenSharing ? "destructive" : "secondary"}
        onClick={() => onScreenShareChange(!isScreenSharing)}
        className="flex items-center gap-2"
      >
        <MonitorUp className="h-4 w-4" />
        {isScreenSharing ? "Stop" : "Share"} Screen
      </Button>
    </div>
  );
};
