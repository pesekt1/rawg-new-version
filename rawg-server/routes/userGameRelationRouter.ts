import { Router } from "express";
import { UserGameRelationService } from "../services/userGameRelationService";

export function userGameRelationRouter(service: UserGameRelationService) {
  const router = Router();

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await service.get(Number(userId));
    res.json(user);
  });

  router.post("/:userId/:gameId", async (req, res) => {
    const { userId, gameId } = req.params;
    const result = await service.add(Number(userId), Number(gameId));
    res.json(result);
  });

  router.delete("/:userId/:gameId", async (req, res) => {
    const { userId, gameId } = req.params;
    const result = await service.remove(Number(userId), Number(gameId));
    res.json(result);
  });

  return router;
}
