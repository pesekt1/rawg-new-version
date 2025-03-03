import express from "express";
import cors from "cors";
import dbConnectMysql from "./dbConnection";
import setupRouters from "./setupRouters";

const init = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());

  dbConnectMysql();
  setupRouters(app);
};

export default init;
