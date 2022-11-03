import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.get("/:userId", userController.getUser);
userRouter.post("/join", userController.addUser);
userRouter.put("/:userId", userController.editUser);
userRouter.delete("/:userId", userController.removeUser);

export { userRouter };
