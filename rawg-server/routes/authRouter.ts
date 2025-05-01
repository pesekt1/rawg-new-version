import { Router } from "express";
import { AuthService } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";

const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await AuthService.register(username, password);
    res.status(201).send(user);
  })
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);
    res.send(result);
  })
);

export default authRouter;
