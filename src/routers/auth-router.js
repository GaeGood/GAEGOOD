import { Router } from "express";
import { authController } from "../controllers";
const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.get("/verifyToken", authController.verifyToken);
authRouter.post("/renewPassword", authController.renewPassword);

export { authRouter };
