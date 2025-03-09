
import { Card } from "@/components/ui/card";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { Check } from "lucide-react";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const QuestionnaireChat = () => {
  const {
    messages,
    input,
    isAnalyzing,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleFinish
  } = useChat();
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col chat-container animate-fade-in">
      <ChatMessageList messages={messages} />
      <div className="p-4 border-t space-y-4">
        <ChatInput
          input={input}
          isAnalyzing={isAnalyzing}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="space-y-1">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setShowEndConfirmation(true)}
            disabled={isAnalyzing}
          >
            <Check className="h-4 w-4 mr-2" />
            End Interview
          </Button>
          <p className="text-sm text-center text-gray-500">End the interview at anytime by clicking here</p>
        </div>
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
    </Card>
  );
};
