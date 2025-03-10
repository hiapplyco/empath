
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CareNeedsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CareNeeds = ({ data, onUpdate, onNext, onBack }: CareNeedsProps) => {
  const [formData, setFormData] = useState(data || {
    careLevel: "",
    primaryNeeds: [],
    medicalConditions: [],
    mobilityStatus: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  const careTypes = [
    { id: "daily-activities", label: "Daily Activities Assistance" },
    { id: "medical-care", label: "Medical Care" },
    { id: "companionship", label: "Companionship" },
    { id: "specialized", label: "Specialized Care" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Care Needs Assessment</CardTitle>
        <CardDescription>
          Help us understand the type and level of care needed
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-4">
          <Label>Level of Care Needed</Label>
          <RadioGroup
            value={formData.careLevel}
            onValueChange={(value) => setFormData({ ...formData, careLevel: value })}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="minimal" id="minimal" />
              <Label htmlFor="minimal">Minimal Assistance</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">Moderate Assistance</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="extensive" id="extensive" />
              <Label htmlFor="extensive">Extensive Assistance</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Types of Care Needed (Select all that apply)</Label>
          <div className="grid gap-4">
            {careTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2 border p-4 rounded-lg">
                <Checkbox
                  id={type.id}
                  checked={formData.primaryNeeds.includes(type.id)}
                  onCheckedChange={(checked) => {
                    const updatedNeeds = checked
                      ? [...formData.primaryNeeds, type.id]
                      : formData.primaryNeeds.filter((need: string) => need !== type.id);
                    setFormData({ ...formData, primaryNeeds: updatedNeeds });
                  }}
                />
                <Label htmlFor={type.id}>{type.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Mobility Status</Label>
          <RadioGroup
            value={formData.mobilityStatus}
            onValueChange={(value) => setFormData({ ...formData, mobilityStatus: value })}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="independent" id="independent" />
              <Label htmlFor="independent">Fully Independent</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="assisted" id="assisted" />
              <Label htmlFor="assisted">Needs Some Assistance</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="dependent" id="dependent" />
              <Label htmlFor="dependent">Fully Dependent</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!formData.careLevel || !formData.mobilityStatus || formData.primaryNeeds.length === 0}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </form>
  );
};
