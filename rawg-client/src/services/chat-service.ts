import { apiPost } from "./api-client";

export type ChatSendMessageRequest = {
  prompt: string;
  conversationId: string;
};

export type ChatSendMessageResponse = {
  message: string;
};

class ChatService {
  sendMessage(req: ChatSendMessageRequest) {
    return apiPost<ChatSendMessageResponse, ChatSendMessageRequest>(
      "/chat",
      req
    );
  }
}

export const chatService = new ChatService();
