import { Body, Controller, Post, Route, Tags, ValidateError } from "tsoa";
import z from "zod";
import { chatService } from "../services/chatService";
import type { ChatRequestDto, ChatResponseDto } from "./dto/ChatDto";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required.")
    .max(2000, "Prompt is too long (max 2000 characters)."),
  conversationId: z.string().uuid(),
});

@Route("chat")
@Tags("Chat")
export class ChatController extends Controller {
  @Post("/")
  public async sendMessage(
    @Body() body: ChatRequestDto
  ): Promise<ChatResponseDto> {
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, { message: string; value?: unknown }> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "body";
        fields[key] = {
          message: issue.message,
          value: (body as any)?.[issue.path[0] as any],
        };
      }
      throw new ValidateError(fields, "Invalid request body");
    }

    const { prompt, conversationId } = parsed.data;
    const response = await chatService.sendMessage(prompt, conversationId);
    return { message: response.message };
  }
}
