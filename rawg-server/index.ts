import express from "express";
import init from "./startup/init";
import dotenv from "dotenv";
import { RegisterRoutes } from "./routes/routes"; // tsoa-generated
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { errorHandler } from "./middleware/errorHandler"; // <-- add import
import { Request, Response, NextFunction } from "express";

dotenv.config();

// Extend Express Request type to allow req.user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();

init(app);

app.use(express.json());

// Log all incoming requests for debugging, except healthcheck
app.use((req, res, next) => {
  if (req.originalUrl !== "/health") {
    console.log(`[${req.method}] ${req.originalUrl}`);
  }
  next();
});

// Optionally clear user before each request (for tsoa authentication)
app.use((req, res, next) => {
  req.user = undefined;
  next();
});

// Add tsoa-generated routes and Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);

//just for testing purposes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Serve swagger.json statically at /swagger.json
app.get("/swagger.json", (req, res) => {
  res.json(swaggerDocument);
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

// Log all errors before the error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler:", err);
  next(err);
});

// Register error handler after all routes
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
