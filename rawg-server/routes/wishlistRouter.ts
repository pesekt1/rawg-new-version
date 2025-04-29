import { Router } from "express";
import { wishlistService } from "../services/wishlistService";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await wishlistService.get(Number(userId));
  res.json(user);
});

router.post("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const wishlist = await wishlistService.add(Number(userId), Number(gameId));
  res.json(wishlist);
});

router.delete("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const wishlist = await wishlistService.remove(Number(userId), Number(gameId));
  res.json(wishlist);
});

export default router;
