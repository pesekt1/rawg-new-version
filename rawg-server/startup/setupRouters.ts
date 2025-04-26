import express from "express";
import genreRouter from "../routes/genreRouter";
import storeRouter from "../routes/StoreRouter";
import parentPlatformRouter from "../routes/parentPlatformRouter";
import gameRouter from "../routes/GameRouter";
import publisherRouter from "../routes/publisherRouter";
import authRouter from "../routes/authRouter"; // add this import
import wishlistRouter from "../routes/wishlistRouter";

const setupRouters = (app: express.Application) => {
  app.use("/genres", genreRouter);
  app.use("/stores", storeRouter);
  app.use("/platforms/lists/parents", parentPlatformRouter);
  app.use("/games", gameRouter);
  app.use("/publishers", publisherRouter);
  app.use("/auth", authRouter); // add this line
  app.use("/wishlist", wishlistRouter);
};

export default setupRouters;
