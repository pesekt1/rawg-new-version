/**
 * Initializes the Express application with middleware, database connection, and routers.
 *
 * @param app - The Express application instance to initialize.
 */
import express from "express";
import cors from "cors";
import dbConnectMysql from "./dbConnection";
import setupRouters from "./setupRouters";

/**
 * Sets up middleware, connects to the database, and registers routers.
 */
const init = (app: express.Application) => {
  app.use(cors()); // Enable CORS for all requests
  app.use(express.json()); // Enable JSON parsing for all requests

  dbConnectMysql(); // Initialize MySQL database connection
  setupRouters(app); // Register all application routers
};

export default init;
