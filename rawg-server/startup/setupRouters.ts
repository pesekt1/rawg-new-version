import express from "express";
import genreRouter from "../routes/genreRouter";
import storeRouter from "../routes/StoreRouter";
import parentPlatformRouter from "../routes/parentPlatformRouter";
import gameRouter from "../routes/GameRouter";
import publisherRouter from "../routes/publisherRouter"; // add this import

//assing endpoints to the routers
const setupRouters = (app: express.Application) => {
  app.use("/genres", genreRouter);
  app.use("/stores", storeRouter);
  app.use("/platforms/lists/parents", parentPlatformRouter);
  app.use("/games", gameRouter);
  app.use("/publishers", publisherRouter); // add this line
};

export default setupRouters;
