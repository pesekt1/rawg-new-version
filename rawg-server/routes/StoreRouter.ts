import { Router } from "express";
import { Store } from "../entities/Store";
import { getAllStores } from "../services/storeService";

interface Response {
  count: number;
  results: Store[];
}

const storeRouter = Router();

storeRouter.get("/", async (req, res) => {
  const stores = await getAllStores();
  const response: Response = {
    count: stores.length,
    results: stores,
  };
  res.send(response);
});

export default storeRouter;
