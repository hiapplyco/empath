
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScheduleProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Schedule = ({ data, onUpdate, onNext, onBack }: ScheduleProps) => {
  const [formData, setFormData] = useState(data || {
    frequency: "",
    schedule: "",
    startDate: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Schedule Preferences</CardTitle>
        <CardDescription>
          Tell us about your care schedule needs
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-4">
          <Label>Care Frequency</Label>
          <RadioGroup
            value={formData.frequency}
            onValueChange={(value) => setFormData({ ...formData, frequency: value })}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily Care</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Several Times a Week</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="24/7" id="fulltime" />
              <Label htmlFor="fulltime">24/7 Care</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Preferred Start Date</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Duration of Care Needed</Label>
          <Select 
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temporary">Temporary (Short-term)</SelectItem>
              <SelectItem value="ongoing">Ongoing (Long-term)</SelectItem>
              <SelectItem value="unknown">Not Sure Yet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={!formData.frequency || !formData.startDate || !formData.duration}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </form>
  );
};
