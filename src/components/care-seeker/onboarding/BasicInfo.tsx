
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface BasicInfoProps {
  onComplete: (data: any) => void;
}

export const BasicInfo = ({ onComplete }: BasicInfoProps) => {
  const [relationship, setRelationship] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please sign in to continue"
        });
        return;
      }

      onComplete({
        relationship_to_recipient: relationship,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to em.path</h1>
        <p className="mt-2 text-gray-600">
          Let's start by understanding who you're seeking care for
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>I'm seeking care for:</Label>
          <RadioGroup
            value={relationship}
            onValueChange={setRelationship}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="self" id="self" />
              <Label htmlFor="self">Myself</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="family_member" id="family" />
              <Label htmlFor="family">A family member</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="friend" id="friend" />
              <Label htmlFor="friend">A friend</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="client" id="client" />
              <Label htmlFor="client">A client</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!relationship}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};
