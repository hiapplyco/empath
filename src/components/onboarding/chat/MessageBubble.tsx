
interface MessageBubbleProps {
  role: 'assistant' | 'user';
  content: string;
}

export const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  return (
    <div
      className={`flex ${
        role === 'assistant' ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          role === 'assistant'
            ? 'bg-[#E5DEFF] text-gray-800'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {content}
      </div>
    </div>
  );
};
