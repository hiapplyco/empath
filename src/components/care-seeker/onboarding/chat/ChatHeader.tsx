import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

interface ChatHeaderProps {
  onBack: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onEndInterview?: () => void;
  isEndingInterview?: boolean;
}

export const ChatHeader = ({ 
  onBack, 
  language, 
  onLanguageChange,
  onEndInterview,
  isEndingInterview 
}: ChatHeaderProps) => {
  return (
    <div className="border-b p-4 flex items-center gap-4">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ChevronLeft className="h-4 w-4" /> Back
      </Button>
      <Avatar className="w-8 h-8">
        <AvatarImage src="/emma.png" alt="Emma" />
        <AvatarFallback>EA</AvatarFallback>
      </Avatar>
      <div className="flex-grow flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Emma (AI Assistant)</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector 
            language={language}
            onLanguageChange={onLanguageChange}
          />
          {onEndInterview && (
            <Button 
              onClick={onEndInterview}
              disabled={isEndingInterview}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isEndingInterview ? "Processing..." : "End Interview"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
