import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

export { userRouter };
