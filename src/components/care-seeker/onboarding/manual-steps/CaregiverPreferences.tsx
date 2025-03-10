
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CaregiverPreferencesProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CaregiverPreferences = ({ data, onUpdate, onNext, onBack }: CaregiverPreferencesProps) => {
  const [formData, setFormData] = useState(data || {
    requiredSkills: [],
    genderPreference: "",
    languages: [],
    experienceLevel: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  const skillsList = [
    { id: "lifting", label: "Heavy Lifting" },
    { id: "medication", label: "Medication Management" },
    { id: "dementia", label: "Dementia Care" },
    { id: "cooking", label: "Cooking" },
    { id: "driving", label: "Driving" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Caregiver Preferences</CardTitle>
        <CardDescription>
          Help us understand what you're looking for in a caregiver
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-4">
          <Label>Required Skills (Select all that apply)</Label>
          <div className="grid gap-4">
            {skillsList.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-2 border p-4 rounded-lg">
                <Checkbox
                  id={skill.id}
                  checked={formData.requiredSkills.includes(skill.id)}
                  onCheckedChange={(checked) => {
                    const updatedSkills = checked
                      ? [...formData.requiredSkills, skill.id]
                      : formData.requiredSkills.filter((s: string) => s !== skill.id);
                    setFormData({ ...formData, requiredSkills: updatedSkills });
                  }}
                />
                <Label htmlFor={skill.id}>{skill.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender Preference</Label>
          <Select 
            value={formData.genderPreference}
            onValueChange={(value) => setFormData({ ...formData, genderPreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_preference">No Preference</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select 
            value={formData.experienceLevel}
            onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
              <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={formData.requiredSkills.length === 0 || !formData.experienceLevel}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </form>
  );
};
