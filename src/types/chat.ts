
export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  role: MessageRole;
  text: string;
}
