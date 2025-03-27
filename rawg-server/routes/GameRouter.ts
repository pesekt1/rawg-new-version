import { Router } from "express";
import { getGames } from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  //getGames returns the modified object to with the client
  const modifiedGames = await getGames(req);
  const response = {
    count: modifiedGames.length,
    results: modifiedGames,
  };
  res.send(response);
});

export default gameRouter;
