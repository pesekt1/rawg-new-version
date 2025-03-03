import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";
import { GameOriginal } from "./entities/GameOriginal";

async function insertData() {
  await AppDataSource.initialize();

  const rawData = fs.readFileSync("games.json", "utf-8");
  const parsedData = JSON.parse(rawData);
  const gamesOriginalData: GameOriginal[] = parsedData.results;
  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((p) => p.platform),
    stores: game.stores.map((s) => s.store),
  }));
}

insertData();
