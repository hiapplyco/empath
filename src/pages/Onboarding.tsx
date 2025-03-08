import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const OnboardingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState<string>("text");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    experience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('caregiver_profiles')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          years_experience: parseInt(formData.experience),
          onboarding_step: 2
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Choose Your Application Method
          </CardTitle>
          <CardDescription>
            Select how you'd like to share your information with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup
              defaultValue="text"
              value={inputMethod}
              onValueChange={setInputMethod}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-lg">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="flex-1">Text Questionnaire</Label>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-lg opacity-50">
                <RadioGroupItem value="resume" id="resume" disabled />
                <Label htmlFor="resume" className="flex-1">Resume Upload (Coming Soon)</Label>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-lg opacity-50">
                <RadioGroupItem value="audio" id="audio" disabled />
                <Label htmlFor="audio" className="flex-1">Audio Introduction (Coming Soon)</Label>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-lg opacity-50">
                <RadioGroupItem value="video" id="video" disabled />
                <Label htmlFor="video" className="flex-1">Video Introduction (Coming Soon)</Label>
              </div>
            </RadioGroup>

            {inputMethod === "text" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
