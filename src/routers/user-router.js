import { Router } from "express";
import { userController } from "../controllers";
import { bodyEmptyChecker, loginRequired } from "../middlewares";
import { checkOwner } from "../middlewares";
const userRouter = Router();

userRouter.get("/:userId", loginRequired, checkOwner, userController.getUser);
userRouter.post("/", userController.addUser);
userRouter.put(
  "/:userId",
  bodyEmptyChecker,
  loginRequired,
  checkOwner,
  userController.editUser
);
userRouter.delete(
  "/:userId",
  loginRequired,
  checkOwner,
  userController.removeUser
);

export { userRouter };
