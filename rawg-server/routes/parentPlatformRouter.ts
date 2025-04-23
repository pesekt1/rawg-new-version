import { Router } from "express";
import { ParentPlatform } from "../entities/ParentPlatform";
import { getAllParentPlatforms } from "../services/parentPlatformService";

interface Response {
  count: number;
  results: ParentPlatform[];
}

const parentPlatformRouter = Router();

parentPlatformRouter.get("/", async (req, res) => {
  const parentPlatforms = await getAllParentPlatforms();
  const response: Response = {
    count: parentPlatforms.length,
    results: parentPlatforms,
  };
  res.send(response);
});

export default parentPlatformRouter;
