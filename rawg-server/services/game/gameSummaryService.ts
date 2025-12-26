import { Game } from "../../entities/Game";
import { AppDataSource } from "../../startup/data-source";
import { llmClient } from "../llm/client";
import templatePrompt from "../llm/prompts/summarize-reviews";
import { reviewService } from "../reviewService";

/**
 * Generates and persists AI-written summaries of recent user reviews for a game.
 *
 * This service is cache-first: summaries are stored on the `Game` entity and reused
 * unless explicitly regenerated via `force = true`.
 */
export class GameSummaryService {
  /** TypeORM repository for `Game` used for reading/writing the cached summary fields. */
  private gameRepository = AppDataSource.getRepository(Game);

  /**
   * Returns an AI summary of the most recent reviews for a given game.
   *
   * Behavior:
   * - If `force` is `false` and a cached `game.summary` exists, returns it as-is.
   * - Otherwise, fetches up to 15 most recent reviews, summarizes them via the LLM,
   *   writes the summary fields back onto the `Game` record, and returns the summary.
   *
   * Side effects:
   * - Persists `game.summary`, `game.summaryAiModel`, and `game.summaryUpdatedAt`.
   *
   * @param gameId Database id of the game to summarize reviews for.
   * @param force When `true`, bypasses the cached summary and regenerates it.
   * @throws {Error & { status: number }} 404 when the game is not found.
   * @throws {Error & { status: number }} 400 when there are no reviews to summarize.
   * @returns The summary text (cached or newly generated).
   */
  async summarizeGameReviews(gameId: number, force = false): Promise<string> {
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      const err: any = new Error("Game not found");
      err.status = 404;
      throw err;
    }

    // Cache-first (single summary stored on Game)
    if (!force && game.summary) return game.summary;

    // Fetch most recent reviews
    const reviews = await reviewService.getMostRecentByGameId(gameId, 15);
    if (!reviews.length) {
      const err: any = new Error("There are no reviews to summarize.");
      err.status = 400;
      throw err;
    }

    const joinedReviews = reviews
      .map((r) => `Rating: ${r.rating}\n${r.review}`)
      .join("\n\n");

    //OpenAI summarization.
    const prompt = templatePrompt.replace("{{reviews}}", joinedReviews);
    const { text: summary } = await llmClient.generateText({
      model: "gpt-4.1",
      prompt: prompt,
      // Lower temperature for more stable, less “creative” summaries.
      temperature: 0.2,
      // Hard cap to prevent unexpectedly large responses.
      maxTokens: 500,
    });

    game.summary = summary;
    game.summaryAiModel = "gpt-4.1-mini";
    game.summaryUpdatedAt = new Date();
    await this.gameRepository.save(game);

    return summary;
  }
}

export const gameSummaryService = new GameSummaryService();
