import express from "express";
import init from "./startup/init";
import dotenv from "dotenv";
import { RegisterRoutes } from "./routes/routes"; // tsoa-generated
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import * as path from "path";

dotenv.config();

const app = express();

init(app);

// Add tsoa-generated routes and Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Serve swagger.json statically at /swagger.json
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

// Serve ReDoc documentation
app.get("/redoc", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs | ReDoc</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>body { margin: 0; padding: 0; }</style>
      </head>
      <body>
        <redoc spec-url='/swagger.json'></redoc>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
