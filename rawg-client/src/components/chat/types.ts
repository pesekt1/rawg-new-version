/**
 * Chat UI + API types (kept next to chat components).
 */
export type ChatRole = "user" | "bot";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatSendMessageRequest = {
  prompt: string;
  conversationId: string;
};

export type ChatSendMessageResponse = {
  message: string;
};

export type ChatResponse = ChatSendMessageResponse;
