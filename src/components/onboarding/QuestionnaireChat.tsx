
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Check, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface GeminiResponse {
  parsed_data: any;
  next_question: string;
  completed: boolean;
}

export const QuestionnaireChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial greeting
    setMessages([{
      role: 'assistant',
      content: "Welcome! I'll help you create your caregiver profile. Let's start with your name - what should I call you?"
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveProfileData = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error } = await supabase
        .from('caregiver_profiles')
        .upsert({
          id: user.id,
          contact_info: data.personal_information?.contact_info,
          languages: data.personal_information?.languages,
          first_name: data.personal_information?.name?.split(' ')[0],
          last_name: data.personal_information?.name?.split(' ').slice(1).join(' '),
          specializations: data.experience?.specialties,
          years_experience: data.experience?.years_experience,
          availability: { shift_types: data.experience?.availability?.shift_types },
          patient_types: data.patient_care_details?.patient_types,
          equipment_skills: data.patient_care_details?.equipment_skills,
          emergency_protocols: data.emergency_response?.protocols
        });

      if (error) throw error;

      // Save certifications separately
      if (data.personal_information?.certifications) {
        const certPromises = data.personal_information.certifications.map((cert: string) =>
          supabase
            .from('certifications')
            .upsert({
              caregiver_id: user.id,
              name: cert,
              status: 'pending'
            })
        );
        await Promise.all(certPromises);
      }

    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Error saving profile",
        description: error.message
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;

    const userMessage = input.trim();
    setInput('');
    setIsAnalyzing(true);
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const { data: response, error } = await supabase.functions.invoke('gemini', {
        body: { 
          type: 'text',
          prompt: userMessage,
          history: messages.map(m => ({ role: m.role, text: m.content }))
        }
      });

      if (error) throw error;

      const geminiResponse = response as GeminiResponse;
      
      // Update stored profile data
      setProfileData(prev => ({
        ...prev,
        ...geminiResponse.parsed_data
      }));

      // Add AI response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: geminiResponse.next_question
      }]);

      // If profile is complete, save and proceed
      if (geminiResponse.completed) {
        await saveProfileData(geminiResponse.parsed_data);
        toast({
          title: "Profile Created",
          description: "Your caregiver profile has been saved successfully!"
        });
        navigate('/dashboard');
      }

    } catch (error: any) {
      console.error('Error in conversation:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error. Could you please try again?"
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
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
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isAnalyzing}
          className="flex-1"
        />
        <Button type="submit" disabled={isAnalyzing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <div className="p-4 border-t flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
    </Card>
  );
};

