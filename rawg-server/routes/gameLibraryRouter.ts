import { Router } from "express";
import {
  getUserWithLibrary,
  addToLibrary,
  removeFromLibrary,
} from "../services/gameLibraryService";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await getUserWithLibrary(Number(userId));
  res.json(user);
});

router.post("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const library = await addToLibrary(Number(userId), Number(gameId));
  res.json(library);
});

router.delete("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const library = await removeFromLibrary(Number(userId), Number(gameId));
  res.json(library);
});

export default router;
