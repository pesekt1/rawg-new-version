import express from "express";
import init from "./startup/init";
import dotenv from "dotenv";

dotenv.config();

const app = express();

init(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
