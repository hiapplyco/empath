
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ClipboardList } from "lucide-react";

interface OnboardingSelectionProps {
  onSelect: (type: "chat" | "manual") => void;
}

export const OnboardingSelection = ({ onSelect }: OnboardingSelectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="relative overflow-hidden transition-all hover:shadow-lg cursor-pointer" 
            onClick={() => onSelect("chat")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            Chat with Emma
          </CardTitle>
          <CardDescription>
            Have a natural conversation with our AI assistant to discuss your care needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Perfect if you want to:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              • Explain your situation naturally
            </li>
            <li className="flex items-center gap-2">
              • Get personalized guidance
            </li>
            <li className="flex items-center gap-2">
              • Chat in multiple languages
            </li>
          </ul>
          <Button className="mt-6 w-full">Start Chat</Button>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
            onClick={() => onSelect("manual")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-purple-500" />
            Step-by-Step Form
          </CardTitle>
          <CardDescription>
            Fill out a structured form to specify your care requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Perfect if you want to:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              • See all questions upfront
            </li>
            <li className="flex items-center gap-2">
              • Move at your own pace
            </li>
            <li className="flex items-center gap-2">
              • Edit previous answers easily
            </li>
          </ul>
          <Button className="mt-6 w-full">Start Form</Button>
        </CardContent>
      </Card>
    </div>
  );
};
