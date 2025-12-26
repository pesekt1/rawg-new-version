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
type GenerateTextOptions = {
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
type GenerateTextResult = {
  /** Provider response id (e.g. OpenAI `response.id`). */
  id: string;
  /** Plain text output extracted from the provider response. */
  text: string;
};

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
      text: response.output_text,
    };
  },
};
