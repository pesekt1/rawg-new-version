import { Router } from "express";

import { gameLibraryService } from "../services/gameLibraryService";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await gameLibraryService.get(Number(userId));
  res.json(user);
});

router.post("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const library = await gameLibraryService.add(Number(userId), Number(gameId));
  res.json(library);
});

router.delete("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const library = await gameLibraryService.remove(
    Number(userId),
    Number(gameId)
  );
  res.json(library);
});

export default router;
