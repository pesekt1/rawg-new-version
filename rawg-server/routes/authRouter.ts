import { Router } from "express";
import { AuthService } from "../services/authService";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await AuthService.register(username, password);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

export default authRouter;
