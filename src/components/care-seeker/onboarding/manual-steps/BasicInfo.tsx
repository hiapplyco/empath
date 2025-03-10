
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BasicInfoProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const BasicInfo = ({ data, onUpdate, onNext }: BasicInfoProps) => {
  const [formData, setFormData] = useState(data || {
    careType: "",
    recipientName: "",
    recipientAge: "",
    relationship: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Let's start by understanding who needs care
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-4">
          <Label>Who needs care?</Label>
          <RadioGroup
            value={formData.careType}
            onValueChange={(value) => setFormData({ ...formData, careType: value })}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="self" id="self" />
              <Label htmlFor="self">Myself</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="family" id="family" />
              <Label htmlFor="family">Family Member</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Someone Else</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.careType && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid gap-2">
              <Label htmlFor="recipientName">Care Recipient's Name</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="Enter name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recipientAge">Care Recipient's Age</Label>
              <Input
                id="recipientAge"
                type="number"
                value={formData.recipientAge}
                onChange={(e) => setFormData({ ...formData, recipientAge: e.target.value })}
                placeholder="Enter age"
              />
            </div>

            {(formData.careType === "family" || formData.careType === "other") && (
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship to Care Recipient</Label>
                <Input
                  id="relationship"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  placeholder="e.g., Son, Daughter, Friend"
                />
              </div>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={!formData.careType || !formData.recipientName || !formData.recipientAge}
        >
          Continue
        </Button>
      </CardContent>
    </form>
  );
};
