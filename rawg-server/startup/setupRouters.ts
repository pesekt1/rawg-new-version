/**
 * Registers all API routers and the global error handler with the Express application.
 * Each router handles a specific resource or feature.
 */

import express from "express";
import genreRouter from "../routes/genreRouter";
import storeRouter from "../routes/StoreRouter";
import parentPlatformRouter from "../routes/parentPlatformRouter";
import gameRouter from "../routes/GameRouter";
import publisherRouter from "../routes/publisherRouter";
import authRouter from "../routes/authRouter";
import wishlistRouter from "../routes/wishlistRouter";
import gameLibraryRouter from "../routes/gameLibraryRouter";
import developerRouter from "../routes/developerRouter";
import tagRouter from "../routes/tagRouter";
import { errorHandler } from "../middleware/errorHandler";

/**
 * Attaches all resource routers and the error handler to the Express app.
 * @param app - The Express application instance.
 */
const setupRouters = (app: express.Application) => {
  app.use("/genres", genreRouter);
  app.use("/stores", storeRouter);
  app.use("/platforms/lists/parents", parentPlatformRouter);
  app.use("/games", gameRouter);
  app.use("/publishers", publisherRouter);
  app.use("/auth", authRouter);
  app.use("/wishlist", wishlistRouter);
  app.use("/library", gameLibraryRouter);
  app.use("/developers", developerRouter);
  app.use("/tags", tagRouter);

  // Error handler should be last
  app.use(errorHandler);
};

export default setupRouters;
