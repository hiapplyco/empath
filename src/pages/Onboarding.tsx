
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { AudioRecorder } from "@/components/onboarding/AudioRecorder";
import { VideoRecorder } from "@/components/onboarding/VideoRecorder";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { QuestionnaireChat } from "@/components/onboarding/QuestionnaireChat";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [inputMethod, setInputMethod] = useState<"resume" | "audio" | "video" | "text" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUserId(session.user.id);
    };
    
    checkSession();
  }, [navigate]);

  const handleMethodSelection = async (method: "resume" | "audio" | "video" | "text") => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to continue",
      });
      return;
    }

    setInputMethod(method);
    try {
      const { error } = await supabase
        .from('caregiver_profiles')
        .upsert({ 
          id: userId,
          input_method: method 
        });

      if (error) throw error;
      setStep(2);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Failed to update profile",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <OnboardingProgress currentStep={step} />

        {step === 1 && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Welcome to em.path!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-base">Choose how you'd like to start</Label>
                <RadioGroup
                  value={inputMethod || undefined}
                  onValueChange={(value: "resume" | "audio" | "video" | "text") => 
                    handleMethodSelection(value)
                  }
                  className="grid gap-4"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="resume" id="resume" />
                    <Label htmlFor="resume" className="flex-1">Upload Resume</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="audio" id="audio" />
                    <Label htmlFor="audio" className="flex-1">Record Audio Introduction</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex-1">Record Video Introduction</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text" className="flex-1">Text Questionnaire</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardContent className="pt-6">
              {inputMethod === "resume" && <FileUpload onComplete={() => setStep(3)} />}
              {inputMethod === "audio" && <AudioRecorder onComplete={() => setStep(3)} />}
              {inputMethod === "video" && <VideoRecorder onComplete={() => setStep(3)} />}
              {inputMethod === "text" && <QuestionnaireChat />}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
