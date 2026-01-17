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

let openAIClient: OpenAI | undefined;

/**
 * Get or create the OpenAI client instance.
 * @returns OpenAI client instance.
 * @throws If `OPENAI_API_KEY` is not set.
 */
function getOpenAIClient(): OpenAI {
  if (openAIClient) return openAIClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.",
    );
  }

  openAIClient = new OpenAI({ apiKey });
  return openAIClient;
}

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

/**
 * Tool definition compatible with the OpenAI Responses API `tools` field (function tools).
 *
 * `parameters` should be a JSON Schema object that describes the function arguments.
 */
export type ToolDefinition = Readonly<{
  type: "function";
  name: string;
  description?: string;
  parameters: Record<string, any>;
}>;

/**
 * Async handler invoked when the model requests a tool call.
 *
 * @param args - Parsed tool arguments (typically from JSON).
 * @returns Any JSON-serializable result to be passed back to the model.
 */
export type ToolHandler = (args: any) => Promise<any>;

/**
 * Options for `generateTextWithTools`, extending basic generation options with tool wiring.
 */
export type GenerateTextWithToolsOptions = GenerateTextOptions & {
  /** Tool definitions exposed to the model. */
  tools: readonly ToolDefinition[];
  /** Mapping from tool name to handler implementation. */
  toolHandlers: Record<string, ToolHandler>;
  /**
   * Max number of tool-call/continue rounds before returning a fallback message.
   * @default 6
   */
  maxToolRounds?: number;
};

/**
 * Minimal normalized representation of a function call request from the Responses API.
 */
type FunctionCallItem = {
  name: string;
  arguments: any;
  call_id: string;
};

/**
 * Parse a JSON value safely.
 *
 * - If `value` is an object, it is returned as-is.
 * - If `value` is a string, attempts `JSON.parse`.
 * - Otherwise returns `{}`.
 *
 * @param value - Possibly-stringified JSON value.
 * @returns Parsed object (or `{}` on failure).
 */
function safeJsonParse(value: any): any {
  if (value == null) return {};
  if (typeof value === "object") return value;
  if (typeof value !== "string") return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

/**
 * Extract all function/tool call requests from a Responses API response, defensively
 * handling minor shape variations across SDK/provider versions.
 *
 * @param response - Raw provider response.
 * @returns Normalized array of requested function calls.
 */
function extractFunctionCalls(response: any): FunctionCallItem[] {
  const out: FunctionCallItem[] = [];

  const output = Array.isArray(response?.output) ? response.output : [];
  for (const item of output) {
    // Responses API typically uses type: "function_call"
    if (item?.type === "function_call" && item?.name && item?.call_id) {
      out.push({
        name: item.name,
        arguments: safeJsonParse(item.arguments),
        call_id: item.call_id,
      });
      continue;
    }

    // extra defensive parsing for nested content shapes
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const c of content) {
      if (c?.type === "function_call" && c?.name && c?.call_id) {
        out.push({
          name: c.name,
          arguments: safeJsonParse(c.arguments),
          call_id: c.call_id,
        });
      }
    }
  }

  return out;
}

/**
 * Extract the primary textual answer from a Responses API response, falling back to
 * concatenating structured content parts when `output_text` is absent.
 *
 * @param response - Raw provider response.
 * @returns Best-effort reconstructed response text.
 */
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

    const openAIClient = getOpenAIClient();

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

  /**
   * Generate text while allowing the model to call provided tools.
   *
   * Behavior:
   * - Sends `tools` to the Responses API.
   * - If the model emits tool calls, executes matching `toolHandlers`.
   * - Feeds tool outputs back via `input` and continues until a final text response
   *   is produced or `maxToolRounds` is exceeded.
   *
   * @param options - Generation + tool options (tools, handlers, loop limit).
   * @returns Normalized `{ id, text }`.
   */
  async generateTextWithTools({
    model = "gpt-4.1",
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 300,
    previousResponseId,
    tools,
    toolHandlers,
    maxToolRounds = 6,
  }: GenerateTextWithToolsOptions): Promise<GenerateTextResult> {
    const openAIClient = getOpenAIClient();

    let lastResponseId = previousResponseId;
    let input: any = prompt;

    for (let round = 0; round < maxToolRounds; round++) {
      const response = await openAIClient.responses.create({
        model,
        input,
        instructions,
        temperature,
        max_output_tokens: maxTokens,
        previous_response_id: lastResponseId,
        tools: tools as any,
      } as any);

      const calls = extractFunctionCalls(response);

      // No tool calls → final answer
      if (calls.length === 0) {
        return { id: response.id, text: extractResponseText(response) };
      }

      const toolOutputs = [];
      for (const call of calls) {
        const handler = toolHandlers[call.name];

        if (!handler) {
          toolOutputs.push({
            type: "function_call_output",
            call_id: call.call_id,
            output: JSON.stringify({
              error: `No tool handler registered for "${call.name}"`,
            }),
          });
          continue;
        }

        try {
          const result = await handler(call.arguments);
          toolOutputs.push({
            type: "function_call_output",
            call_id: call.call_id,
            output: JSON.stringify(result),
          });
        } catch (e: any) {
          toolOutputs.push({
            type: "function_call_output",
            call_id: call.call_id,
            output: JSON.stringify({
              error: e?.message ?? "Tool execution failed",
            }),
          });
        }
      }

      // Continue the same “Responses API conversation”
      lastResponseId = response.id;
      input = toolOutputs;
    }

    // If the model keeps calling tools forever, return what we have.
    return {
      id: lastResponseId ?? "unknown",
      text: "Tool call limit reached.",
    };
  },
};
