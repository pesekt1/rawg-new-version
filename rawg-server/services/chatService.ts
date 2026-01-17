import fs from "fs";
import path from "path";
import { conversationRepository } from "../repositories/conversationRepository";
import { llmClient } from "./llm/client";
import { rawgDbToolset } from "./llm/rawgDbTools";

const promptsDir = path.join(__dirname, "llm", "prompts");

const template = fs.readFileSync(path.join(promptsDir, "chatbot.ts"), "utf-8");
const platformInfo = fs.readFileSync(
  path.join(promptsDir, "rawgPlatform.md"),
  "utf-8",
);
const instructions = template.replace("{{platformInfo}}", platformInfo);

type ChatResponse = {
  id: string;
  message: string;
};

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<ChatResponse> {
    const response = await llmClient.generateTextWithTools({
      model: "gpt-4o-mini",
      instructions,
      prompt,
      temperature: 0.2,
      maxTokens: 350,
      previousResponseId:
        conversationRepository.getLastResponseId(conversationId),
      tools: rawgDbToolset.tools,
      toolHandlers: rawgDbToolset.handlers,
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return { id: response.id, message: response.text };
  },
};
