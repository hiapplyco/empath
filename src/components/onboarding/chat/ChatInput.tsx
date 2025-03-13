
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
    <div className="flex items-center gap-2">
      <Textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="resize-none min-h-[50px]"
      />
      <Button onClick={onSendMessage} disabled={isLoading}>
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
