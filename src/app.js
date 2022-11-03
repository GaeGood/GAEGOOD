import cors from "cors";
import express from "express";
import {
  userRouter,
  authRouter,
  globalRouter,
  orderRouter,
  productRouter,
  pugRouter,
} from "./routers";
import { errorHandler } from "./middlewares";
import { viewsRouter } from "./routers/views-router";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views2");

app.use("/public", express.static("public"));

app.use(cors());

// app.use("/", viewsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pug", pugRouter);
// app.use("/api/users", userRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/products", productRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/", globalRouter);

app.use(errorHandler);

export { app };
