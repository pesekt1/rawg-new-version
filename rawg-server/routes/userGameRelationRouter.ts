import { Router, Request, Response, NextFunction } from "express";
import { UserGameRelationService } from "../services/userGameRelationService";

// Helper to wrap async route handlers and forward errors to Express
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function userGameRelationRouter(service: UserGameRelationService) {
  const router = Router();

  router.get(
    "/:userId",
    asyncHandler(async (req, res) => {
      const { userId } = req.params;
      const user = await service.get(Number(userId));
      res.json(user);
    })
  );

  router.post(
    "/:userId/:gameId",
    asyncHandler(async (req, res) => {
      const { userId, gameId } = req.params;
      const result = await service.add(Number(userId), Number(gameId));
      res.json(result);
    })
  );

  router.delete(
    "/:userId/:gameId",
    asyncHandler(async (req, res) => {
      const { userId, gameId } = req.params;
      const result = await service.remove(Number(userId), Number(gameId));
      res.json(result);
    })
  );

  return router;
}
