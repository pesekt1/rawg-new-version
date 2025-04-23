import { Router } from "express";
import {
  getGame,
  getGames,
  getScreenshots,
  getTrailers,
  createGame,
} from "../services/gameService";

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  try {
    //getGames returns the modified object to with the client
    const response = await getGames(req);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

// Add POST endpoint to create a game
gameRouter.post("/", async (req, res) => {
  try {
    const game = await createGame(req.body);
    res.status(201).send(game);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

gameRouter.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const game = await getGame(slug);
    res.send(game);
  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

gameRouter.get("/:id/movies", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const trailers = await getTrailers(gameId);
    res.send(trailers);
  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

gameRouter.get("/:id/screenshots", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const screenshots = await getScreenshots(gameId);
    res.send(screenshots);
  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

export default gameRouter;
