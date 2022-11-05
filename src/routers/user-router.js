import { Router } from "express";
import { userController } from "../controllers";
import { loginRequired } from "../middlewares";
import { checkOwner } from "../middlewares";
const userRouter = Router();

userRouter.get("/:userId", loginRequired, checkOwner, userController.getUser);
userRouter.post("/", userController.addUser);
userRouter.put("/:userId", loginRequired, checkOwner, userController.editUser);
userRouter.delete(
  "/:userId",
  loginRequired,
  checkOwner,
  userController.removeUser
);

export { userRouter };
