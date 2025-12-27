import { useMemo, useRef, useState } from "react";
import { chatService } from "../services/chat-service";

export type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

function safeUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChat() {
  const conversationId = useRef<string>(useMemo(() => safeUuid(), []));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("");

  const sendMessage = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || isBotTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsBotTyping(true);
    setError("");

    try {
      const res = await chatService.sendMessage({
        prompt: trimmed,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { role: "bot", content: res.message }]);
    } catch {
      setError("Something went wrong, try again!");
    } finally {
      setIsBotTyping(false);
    }
  };

  const reset = () => {
    conversationId.current = safeUuid();
    setMessages([]);
    setError("");
    setIsBotTyping(false);
  };

  return { messages, isBotTyping, error, sendMessage, reset };
}
