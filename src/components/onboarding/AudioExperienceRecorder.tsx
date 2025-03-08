
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const AudioExperienceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await handleAudioUpload(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Start speaking about your caregiving experience"
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check permissions."
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        if (!base64Audio) throw new Error('Failed to convert audio to base64');

        const { data, error } = await supabase.functions.invoke('process-audio', {
          body: { audio: base64Audio }
        });

        if (error) throw error;

        toast({
          title: "Profile Created",
          description: "Your audio has been processed successfully!"
        });

        setTimeout(() => {
          navigate('/dashboard/profile');
        }, 1000);
      };
    } catch (error: any) {
      console.error('Error processing audio:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process audio. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Record Your Experience</h2>
          
          <div className="space-y-4 text-gray-600">
            <p>Please talk about:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your years of caregiving experience</li>
              <li>Types of patients you've worked with</li>
              <li>Special skills or certifications you have</li>
              <li>Languages you speak</li>
              <li>Your preferred work schedule</li>
            </ul>
            <p className="text-sm mt-4">
              Aim for 2-3 minutes. Speak clearly and at a natural pace.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          {isProcessing ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </Button>
          ) : (
            <Button
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className="w-48"
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
          )}
        </div>
      </div>
    </Card>
  );
};
