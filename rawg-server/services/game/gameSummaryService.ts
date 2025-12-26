import { Game } from "../../entities/Game";
import { AppDataSource } from "../../startup/data-source";
import { llmClient } from "../llm/client";
import templatePrompt from "../llm/prompts/summarize-reviews";
import { reviewService } from "../reviewService";

export class GameSummaryService {
  private gameRepository = AppDataSource.getRepository(Game);

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
