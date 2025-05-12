import { Request, Response, NextFunction } from "express";

/**
 * Express error handling middleware.
 * Sends a JSON response with the error message and status code.
 * Defaults to status 500 and a generic message if not provided.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ error: message });
}
