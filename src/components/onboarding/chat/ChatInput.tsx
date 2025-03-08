
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";

interface ChatInputProps {
  input: string;
  isAnalyzing: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const ChatInput = ({
  input,
  isAnalyzing,
  onInputChange,
  onSubmit,
  onBack,
}: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="p-4 border-t space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          disabled={isAnalyzing}
        />
        <Button type="submit" disabled={isAnalyzing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </div>
  );
};
