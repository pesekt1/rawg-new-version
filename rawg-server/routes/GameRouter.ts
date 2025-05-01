import { Router } from "express";
import {
  getGame,
  getGames,
  getScreenshots,
  getTrailers,
  createGame,
  deleteGame,
  updateGame,
} from "../services/gameService";
import { requireAdmin } from "../middleware/requireAdmin";
import { asyncHandler } from "../utils/asyncHandler";

const gameRouter = Router();

gameRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const response = await getGames(req);
    res.send(response);
  })
);

gameRouter.post(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const game = await createGame(req.body);
    res.status(201).send(game);
  })
);

gameRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const game = await getGame(id);
    res.send(game);
  })
);

gameRouter.get(
  "/:id/movies",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const trailers = await getTrailers(gameId);
    res.send(trailers);
  })
);

gameRouter.get(
  "/:id/screenshots",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const screenshots = await getScreenshots(gameId);
    res.send(screenshots);
  })
);

gameRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await deleteGame(id);
    res.status(204).send();
  })
);

gameRouter.patch(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedGame = await updateGame(id, req.body);
    res.send(updatedGame);
  })
);

export default gameRouter;
