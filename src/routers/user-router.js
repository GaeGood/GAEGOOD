import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";
import { userService } from "../services";
import { User } from "../models";

const userRouter = Router();

// users/:userId
userRouter.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.find({ userId });
    res.json(user);
  } catch (err) {
    next(err);
  }

  next();
});

// [Get] users/:userId?edit=true    : SSR => CSR 논의 나와서 rendering 고려한 rest api 재설계 필요
// [Put] users/:usersId
// [Delete] users/:userId

export { userRouter };
