import { Router } from "express";
import { authController } from "../controllers";
const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logoutUser);

export { authRouter };
