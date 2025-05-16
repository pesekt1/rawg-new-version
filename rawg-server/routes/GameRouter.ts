import { Router } from "express";
import { gameService } from "../services/game/gameService";
import { requireAdmin } from "../middleware/requireAdmin";
import { asyncHandler } from "../utils/asyncHandler";

const gameRouter = Router();

gameRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    // Map query params to filters as in the controller
    const {
      page,
      page_size,
      genreId,
      storeId,
      platformId,
      publisherId,
      developerId,
      wishlistUserId,
      libraryUserId,
      sortOrder,
      searchText,
      tagId,
    } = req.query;
    const response = await gameService.getGames({
      page,
      page_size,
      genreId,
      storeId,
      platformId,
      publisherId,
      developerId,
      wishlistUserId,
      libraryUserId,
      sortOrder,
      searchText,
      tagId,
    });
    res.send(response);
  })
);

gameRouter.post(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const game = await gameService.createGame(req.body);
    res.status(201).send(game);
  })
);

gameRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const game = await gameService.getGame(id);
    res.send(game);
  })
);

gameRouter.get(
  "/:id/movies",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const trailers = await gameService.getTrailer(gameId);
    res.send(trailers);
  })
);

gameRouter.get(
  "/:id/screenshots",
  asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const screenshots = await gameService.getScreenshots(gameId);
    res.send(screenshots);
  })
);

gameRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await gameService.deleteGame(id);
    res.status(204).send();
  })
);

gameRouter.patch(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedGame = await gameService.updateGame(id, req.body);
    res.send(updatedGame);
  })
);

export default gameRouter;
