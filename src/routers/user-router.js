import { Router } from "express";
import { userController } from "../controllers";
import { adminRequired, bodyEmptyChecker, loginRequired } from "../middlewares";
import { userOwnRequired } from "../middlewares";
const userRouter = Router();

userRouter.get("/", loginRequired, adminRequired, userController.getUserList);
userRouter.get(
  "/:userId",
  loginRequired,
  userOwnRequired,
  userController.getUser
);
userRouter.post("/", userController.addUser);
userRouter.put(
  "/:userId",
  bodyEmptyChecker,
  loginRequired,
  userOwnRequired,
  userController.editUser
);
userRouter.delete(
  "/:userId",
  loginRequired,
  userOwnRequired,
  userController.removeUser
);

export { userRouter };
