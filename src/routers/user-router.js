import { Router } from "express";
import { userController } from "../controllers";
import { loginRequired } from "../middlewares";
const userRouter = Router();

userRouter.get("/:userId", loginRequired, userController.getUser);
userRouter.post("/", userController.addUser);
userRouter.put("/:userId", loginRequired, userController.editUser);
userRouter.delete("/:userId", loginRequired, userController.removeUser);

export { userRouter };
