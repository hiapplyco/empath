import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { ChatMessagesList } from "./ChatMessagesList";
import { ChatInputSection } from "./ChatInputSection";
import { useChat } from "@/hooks/useChat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ChatInterface = () => {
  const {
    messages,
    input,
    isAnalyzing: isLoading,
    handleInputChange,
    handleSubmit,
    handleFinish
  } = useChat();
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);

  const initializeChat = async () => {
    setIsChatStarted(true);
  };

  if (!isChatStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <Button onClick={initializeChat} size="lg" className="gap-2">
          <Bot className="h-5 w-5" />
          Chat with Emma
        </Button>
        <p className="text-sm text-muted-foreground">
          Start your onboarding journey with Emma, our AI assistant
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen w-full max-w-4xl mx-auto border rounded-lg chat-container animate-fade-in">
      <div className="flex-grow overflow-auto">
        <ChatMessagesList messages={messages} />
      </div>
      <div className="flex-shrink-0">
        <ChatInputSection
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSend={handleSubmit}
          onEndInterview={() => setShowEndConfirmation(true)}
        />
      </div>
      <AlertDialog open={showEndConfirmation} onOpenChange={setShowEndConfirmation}>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the interview? Emma will generate your profile based on the information you've provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowEndConfirmation(false);
              handleFinish();
            }}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
