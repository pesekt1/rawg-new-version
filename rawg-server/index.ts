import express from "express";
import init from "./startup/init";
import dotenv from "dotenv";
import { RegisterRoutes } from "./routes/routes"; // tsoa-generated
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app = express();

init(app);

// Add tsoa-generated routes and Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
