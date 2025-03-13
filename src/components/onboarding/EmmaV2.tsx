
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Camera, StopCircle, MonitorUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AudioRecorder } from './audio/AudioRecorder';
import { AudioVisualizer } from './audio/AudioVisualizer';
import { Controls } from './controls/Controls';
import { ConversationInterface } from './conversation/ConversationInterface';
import { supabase } from "@/lib/supabase";

interface EmmaV2Props {
  onComplete: () => void;
}

export const EmmaV2 = ({ onComplete }: EmmaV2Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize WebSocket connection when component mounts
    initializeSession();
    return () => {
      // Cleanup WebSocket connection when component unmounts
      cleanupSession();
    };
  }, []);

  const initializeSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('emma-v2-session', {
        body: { 
          userId: session.user.id,
          mode: 'initialize'
        }
      });

      if (error) throw error;

      toast({
        title: "Connected to Emma",
        description: "Ready to start the conversation",
      });
    } catch (error: any) {
      console.error('Session initialization error:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to Emma. Please try again.",
      });
    }
  };

  const cleanupSession = async () => {
    try {
      const { error } = await supabase.functions.invoke('emma-v2-session', {
        body: { mode: 'cleanup' }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Session cleanup error:', error);
    }
  };

  const handleSkipOrComplete = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Card className="flex-1 m-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-hidden flex">
          {/* Main conversation area */}
          <div className="flex-1 flex flex-col">
            <ConversationInterface />
            
            {/* Audio visualizer */}
            <div className="h-24 border-t">
              <AudioVisualizer isRecording={isRecording} />
            </div>
          </div>

          {/* Optional video/screen share area */}
          {(isVideoEnabled || isScreenSharing) && (
            <div className="w-1/3 border-l bg-gray-50 p-4">
              {/* Video/screen content will be rendered here */}
            </div>
          )}
        </div>

        {/* Controls */}
        <Controls 
          isRecording={isRecording}
          isVideoEnabled={isVideoEnabled}
          isScreenSharing={isScreenSharing}
          onRecordingChange={setIsRecording}
          onVideoChange={setIsVideoEnabled}
          onScreenShareChange={setIsScreenSharing}
        />
      </Card>
    </div>
  );
};
