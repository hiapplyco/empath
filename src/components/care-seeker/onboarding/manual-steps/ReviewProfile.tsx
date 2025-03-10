
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ReviewProfileProps {
  formData: any;
  onBack: () => void;
}

export const ReviewProfile = ({ formData, onBack }: ReviewProfileProps) => {
  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle>Review Your Profile</CardTitle>
        <CardDescription>
          Please review the information you've provided
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        {Object.entries(formData).map(([section, data]: [string, any]) => (
          <div key={section} className="space-y-2">
            <h3 className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="rounded-lg border p-4">
              {Object.entries(data).map(([key, value]: [string, any]) => (
                <div key={key} className="py-1">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                  <span className="text-gray-600">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button type="button">
            Submit Profile
          </Button>
        </div>
      </CardContent>
    </div>
  );
};
