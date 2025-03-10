
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LocationDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LocationDetails = ({ data, onUpdate, onNext, onBack }: LocationDetailsProps) => {
  const [formData, setFormData] = useState(data || {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    accessNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="px-0">
        <CardTitle>Location Details</CardTitle>
        <CardDescription>
          Where will care be provided?
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter street address"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Enter city"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="Enter state"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            placeholder="Enter ZIP code"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessNotes">Access Notes (Optional)</Label>
          <Textarea
            id="accessNotes"
            value={formData.accessNotes}
            onChange={(e) => setFormData({ ...formData, accessNotes: e.target.value })}
            placeholder="Any special instructions for accessing the location?"
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={!formData.address || !formData.city || !formData.state || !formData.zipCode}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </form>
  );
};
