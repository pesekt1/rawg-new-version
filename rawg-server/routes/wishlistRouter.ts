import { Router } from "express";
import {
  getUserWithWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await getUserWithWishlist(Number(userId));
  res.json(user);
});

router.post("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const wishlist = await addToWishlist(Number(userId), Number(gameId));
  res.json(wishlist);
});

router.delete("/:userId/:gameId", async (req, res) => {
  const { userId, gameId } = req.params;
  const wishlist = await removeFromWishlist(Number(userId), Number(gameId));
  res.json(wishlist);
});

export default router;
