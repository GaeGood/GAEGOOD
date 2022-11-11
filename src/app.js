import cors from "cors";
import express from "express";
import {
  userRouter,
  authRouter,
  orderRouter,
  productRouter,
  categoryRouter,
} from "./routers";
import { errorHandler } from "./middlewares";
import { viewsRouter } from "./routers/views-router";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);

app.use("/", viewsRouter);

app.use(errorHandler);

export { app };
