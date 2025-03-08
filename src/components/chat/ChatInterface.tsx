
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatMessage } from "@/types/chat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const initializeChat = async () => {
    setIsChatStarted(true);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { message: "START_CHAT" }
      });

      if (error) throw error;

      if (data.type === 'message') {
        setMessages([{ role: "assistant" as const, text: data.text }]);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text: input.trim() };
    setInput('');
    setIsLoading(true);

    try {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: userMessage.text,
          history: newMessages
        }
      });

      if (error) throw error;

      if (data.type === 'message') {
        setMessages([...newMessages, { role: "assistant", text: data.text }]);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          action: 'finish',
          history: messages
        }
      });

      if (error) throw error;

      if (data.type === 'profile') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user found');

        // Save both raw and structured data
        const { error: profileError } = await supabase
          .from('caregiver_profiles')
          .upsert({
            id: user.id,
            gemini_response: data.data, // Save the complete raw response
            // Also save structured data for direct queries
            name: data.data.personal_information?.name,
            languages: data.data.personal_information?.languages,
            years_experience: data.data.experience?.years_experience,
            availability_details: data.data.experience?.availability,
            patient_types: data.data.patient_care_details?.patient_types,
            equipment_skills: data.data.patient_care_details?.equipment_skills,
            emergency_protocols: data.data.emergency_response?.protocols
          });

        if (profileError) throw profileError;

        toast({
          title: "Profile Created",
          description: "Your profile has been successfully created!"
        });
        
        // Navigate to the profile page after successful completion
        navigate('/dashboard/profile');
      } else {
        throw new Error('Failed to generate profile');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
      setShowEndConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatStarted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Button onClick={initializeChat} size="lg" className="gap-2">
          <Bot className="h-5 w-5" />
          Chat with Emma
        </Button>
        <p className="text-sm text-muted-foreground">
          Start your onboarding journey with Emma, our AI assistant
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => setShowEndConfirmation(true)}
          disabled={isLoading}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          End Interview
        </Button>
      </div>

      <AlertDialog open={showEndConfirmation} onOpenChange={setShowEndConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the interview? Emma will generate your profile based on the information you've provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinish}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
