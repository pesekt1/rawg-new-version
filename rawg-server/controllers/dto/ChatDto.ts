export interface ChatRequestDto {
  prompt: string;
  conversationId: string; // UUID
}

export interface ChatResponseDto {
  message: string;
}
