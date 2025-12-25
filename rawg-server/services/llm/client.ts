import OpenAI from "openai";

// OpenAI client used for the main "generateText" path (Responses API).
// Requires OPENAI_API_KEY in the environment.
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  temperature?: number;
  maxTokens?: number;
  /**
   * Provider-specific conversation continuation token.
   * For OpenAI Responses API this maps to `previous_response_id` and allows multi-turn
   * continuity without resending full message history.
   */
  previousResponseId?: string;
};

type GenerateTextResult = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model = "gpt-4.1",
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 300,
    previousResponseId,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    // OpenAI Responses API:
    // - `input` is the user prompt
    // - `instructions` behaves like a system/developer message
    // - `max_output_tokens` caps output length
    // - `previous_response_id` links to the prior response for continuity
    const response = await openAIClient.responses.create({
      model,
      input: prompt,
      instructions,
      temperature,
      max_output_tokens: maxTokens,
      previous_response_id: previousResponseId,
    });

    // Normalize provider response to `{ id, text }` for callers.
    return {
      id: response.id,
      text: response.output_text,
    };
  },
};
