
import { Card } from "@/components/ui/card";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export const QuestionnaireChat = () => {
  const {
    messages,
    input,
    isAnalyzing,
    handleInputChange,
    handleSubmit,
    handleBack
  } = useChat();

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ChatMessageList messages={messages} />
      <ChatInput
        input={input}
        isAnalyzing={isAnalyzing}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </Card>
  );
};
