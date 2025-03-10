
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalInfoProps {
  data: any;
  onUpdate: (data: any) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const AdditionalInfo = ({ data, onUpdate, onComplete, onBack }: AdditionalInfoProps) => {
  const [formData, setFormData] = useState(data || {
    specialRequirements: "",
    hasPets: false,
    petDetails: "",
    additionalNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>
          Help us understand any other important details
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea
            id="specialRequirements"
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            placeholder="Any special requirements or preferences?"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPets"
              checked={formData.hasPets}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, hasPets: checked });
                if (!checked) setFormData({ ...formData, hasPets: checked, petDetails: "" });
              }}
            />
            <Label htmlFor="hasPets">Pets in the home</Label>
          </div>

          {formData.hasPets && (
            <div className="space-y-2">
              <Label htmlFor="petDetails">Pet Details</Label>
              <Textarea
                id="petDetails"
                value={formData.petDetails}
                onChange={(e) => setFormData({ ...formData, petDetails: e.target.value })}
                placeholder="Please describe your pets"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="Any other information you'd like to share?"
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </form>
  );
};
