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

const app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/", globalRouter);

app.use(errorHandler);

export { app };
