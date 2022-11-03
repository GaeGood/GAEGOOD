import cors from "cors";
import express from "express";
import {
  userRouter,
  authRouter,
  globalRouter,
  orderRouter,
  productRouter,
} from "./routers";
import { errorHandler } from "./middlewares";
import { viewsRouter } from "./routers/views-router";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(viewsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/", globalRouter);

app.use(errorHandler);

export { app };
