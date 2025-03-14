
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatInput = ({ input, isLoading, onInputChange, onSendMessage }: ChatInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="border-t bg-white">
      <div className="flex items-center gap-2 p-2">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="resize-none min-h-[20px] max-h-[80px] py-1"
          rows={1}
        />
        <Button 
          onClick={onSendMessage} 
          disabled={isLoading}
          size="icon"
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
