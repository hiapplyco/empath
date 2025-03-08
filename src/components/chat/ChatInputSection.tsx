
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, AlertCircle } from "lucide-react";

interface ChatInputSectionProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onEndInterview: () => void;
}

export const ChatInputSection = ({
  input,
  isLoading,
  onInputChange,
  onSend,
  onEndInterview,
}: ChatInputSectionProps) => {
  return (
    <div className="p-4 border-t space-y-4">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          disabled={isLoading}
        />
        <Button onClick={onSend} disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={onEndInterview}
        disabled={isLoading}
      >
        <AlertCircle className="h-4 w-4 mr-2" />
        End Interview
      </Button>
    </div>
  );
};
