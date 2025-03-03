import { Router } from "express";
import { Genre } from "../entities/Genre";
import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { Store } from "../entities/Store";
import { ParentPlatform } from "../entities/ParentPlatform";

interface ModifinedGame {
  id: number;
  name: string;
  background_image?: string;
  metacritic?: number;
  parent_platforms: { platform: ParentPlatform }[];
  genres: Genre[];
  stores: Store[];
}

interface Response {
  count: number;
  results: ModifinedGame[];
}

const gameRouter = Router();
const gameRepository = AppDataSource.getRepository(Game);

gameRouter.get("/", async (req, res) => {
  const queryBuilder = gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.genres", "genres")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
    .leftJoinAndSelect("game.stores", "stores");

  const games = await queryBuilder.getMany();

  const modifinedGames = games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
  }));

  const response: Response = {
    count: games.length,
    results: modifinedGames,
  };
  res.send(response);
});

export default gameRouter;
