
import { ChatInterface } from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to em.path</h1>
        <p className="text-lg text-gray-600">
          Chat with Emma, our AI assistant, to create your caregiver profile.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
};

export default Index;
