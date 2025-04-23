import { Router, Request, Response, NextFunction } from "express";
import { BaseService } from "../services/baseService";
import { ObjectLiteral } from "typeorm";

// Helper to wrap async route handlers and forward errors to Express
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function createBaseRouter<T extends ObjectLiteral>(
  service: BaseService<T>
) {
  const router = Router();

  // GET all
  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const items = await service.getAll();
      res.send({
        count: items.length,
        results: items,
      });
    })
  );

  // GET by id
  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await service.getById(Number(req.params.id));
      if (!item) return res.status(404).send({ error: "Not found" });
      res.send(item);
    })
  );

  // POST create
  router.post(
    "/",
    asyncHandler(async (req, res) => {
      try {
        const created = await service.create(req.body);
        res.status(201).send(created);
      } catch (e: any) {
        res.status(400).send({ error: e.message });
      }
    })
  );

  // PUT update
  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      try {
        const updated = await service.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).send({ error: "Not found" });
        res.send(updated);
      } catch (e: any) {
        res.status(400).send({ error: e.message });
      }
    })
  );

  // DELETE
  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) return res.status(404).send({ error: "Not found" });
      res.send({ message: "Deleted" });
    })
  );

  return router;
}
