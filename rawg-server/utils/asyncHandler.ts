import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async Express route handler and forwards errors to the error handler middleware.
 *
 * @param fn - The async route handler function (req, res, next) => Promise<any>
 * @returns A function compatible with Express route handlers.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
