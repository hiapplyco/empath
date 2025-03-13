
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Camera, StopCircle, MonitorUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AudioVisualizer } from './audio/AudioVisualizer';
import { Controls } from './controls/Controls';
import { ConversationInterface } from './conversation/ConversationInterface';
import { ChatInput } from './chat/ChatInput';
import { supabase } from "@/lib/supabase";

interface EmmaV2Props {
  onComplete: () => void;
}

export const EmmaV2 = ({ onComplete }: EmmaV2Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    initializeSession();
    return () => {
      cleanupSession();
    };
  }, []);

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

  const initializeSession = async () => {
    setIsLoading(true);
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
      if (!data?.message) throw new Error('No response from Emma');

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      
      toast({
        title: "Connected to Emma",
        description: "Ready to start the conversation",
      });
    } catch (error: any) {
      console.error('Session initialization error:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: error.message || "Failed to connect to Emma. Please try again.",
      });
      navigate('/onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    try {
      const { data, error } = await supabase.functions.invoke('emma-v2-session', {
        body: { 
          message: input,
          mode: 'chat'
        }
      });

      if (error) throw error;
      if (!data?.message) throw new Error('No response from Emma');
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setInput('');
      setIsLoading(false);
    }
  };

  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
    if (recording) {
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Processing your audio...",
      });
    }
  };

  return (
    <div className="h-[90vh] mx-auto max-w-4xl px-4 py-8">
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Main conversation area */}
          <div className="flex-1 overflow-y-auto p-4">
            <ConversationInterface messages={messages} />
          </div>

          {/* Chat input and controls */}
          <div className="p-4 border-t">
            <ChatInput
              input={input}
              isLoading={isLoading}
              onInputChange={setInput}
              onSendMessage={handleSendMessage}
            />
            <div className="mt-4">
              <Controls 
                isRecording={isRecording}
                isVideoEnabled={isVideoEnabled}
                isScreenSharing={isScreenSharing}
                onRecordingChange={handleRecordingChange}
                onVideoChange={setIsVideoEnabled}
                onScreenShareChange={setIsScreenSharing}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
