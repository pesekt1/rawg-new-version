import express from "express";
import cors from "cors";
import dbConnectMysql from "./dbConnection";

const init = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());

  dbConnectMysql();
};

export default init;
