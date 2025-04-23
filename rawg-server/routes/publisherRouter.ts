import { Router } from "express";
import { getPublishers } from "../services/publisherService";

const publisherRouter = Router();

publisherRouter.get("/", async (req, res) => {
  try {
    const response = await getPublishers();
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

export default publisherRouter;
