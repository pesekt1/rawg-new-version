import { Router } from "express";
import { BaseService } from "../services/baseService";
import { ObjectLiteral } from "typeorm";
import { asyncHandler } from "../utils/asyncHandler";
import { requireAdmin } from "../middleware/requireAdmin"; // <-- add import

// Add generic response interface
export interface ListResponse<T> {
  count: number;
  results: T[];
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
      const response: ListResponse<T> = {
        count: items.length,
        results: items,
      };
      res.send(response);
    })
  );

  // GET by id
  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await service.getById(Number(req.params.id));
      if (!item) {
        const err: any = new Error("Not found");
        err.status = 404;
        throw err;
      }
      res.send(item);
    })
  );

  // POST create (protected)
  router.post(
    "/",
    requireAdmin,
    asyncHandler(async (req, res) => {
      const created = await service.create(req.body);
      res.status(201).send(created);
    })
  );

  // PUT update (protected)
  router.put(
    "/:id",
    requireAdmin,
    asyncHandler(async (req, res) => {
      const updated = await service.update(Number(req.params.id), req.body);
      if (!updated) {
        const err: any = new Error("Not found");
        err.status = 404;
        throw err;
      }
      res.send(updated);
    })
  );

  // DELETE (protected)
  router.delete(
    "/:id",
    requireAdmin,
    asyncHandler(async (req, res) => {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) {
        const err: any = new Error("Not found");
        err.status = 404;
        throw err;
      }
      res.send({ message: "Deleted" });
    })
  );

  return router;
}
