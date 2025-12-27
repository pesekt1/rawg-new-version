import OpenAI from "openai";

/**
 * Thin wrapper around the OpenAI Responses API that normalizes outputs for callers.
 *
 * Environment:
 * - Requires `OPENAI_API_KEY`.
 *
 * Contract:
 * - Exposes `generateText()` which returns `{ id, text }` regardless of provider specifics.
 */
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Options for generating a single text response.
 */
export type GenerateTextOptions = {
  /**
   * Model identifier to use for generation.
   * @default "gpt-4.1"
   */
  model?: string;

  /** User prompt / input text. */
  prompt: string;

  /**
   * System/developer-style instructions to steer the model.
   * (Maps to the OpenAI Responses API `instructions` field.)
   */
  instructions?: string;

  /**
   * Sampling temperature; lower is typically more deterministic.
   * @default 0.2
   */
  temperature?: number;

  /**
   * Maximum number of output tokens to generate.
   * (Maps to the OpenAI Responses API `max_output_tokens` field.)
   * @default 300
   */
  maxTokens?: number;

  /**
   * Provider-specific conversation continuation token.
   * For OpenAI Responses API this maps to `previous_response_id` and allows multi-turn
   * continuity without resending full message history.
   */
  previousResponseId?: string;
};

/**
 * Normalized result returned to callers.
 */
export type GenerateTextResult = {
  id: string;
  text: string;
};

function extractResponseText(response: any): string {
  if (typeof response?.output_text === "string")
    return response.output_text.trim();

  // Fallback: try to reconstruct text from structured output parts (SDK/provider-dependent).
  const parts =
    response?.output
      ?.flatMap((o: any) => o?.content ?? [])
      ?.map((c: any) => c?.text) ?? [];
  return parts
    .filter((t: any) => typeof t === "string" && t.length > 0)
    .join("")
    .trim();
}

export const llmClient = {
  /**
   * Generate text from a prompt using the OpenAI Responses API.
   *
   * Notes:
   * - `prompt` is sent as `input`.
   * - `instructions` is sent as a system/developer instruction string.
   * - `previousResponseId` links to a prior response for continuation.
   *
   * @param options Generation options (model, prompt, instructions, sampling, limits).
   * @returns Normalized `{ id, text }`.
   */
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
      text: extractResponseText(response),
    };
  },
};
