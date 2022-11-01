import cors from "cors";
import express from "express";
import { userRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.use(errorHandler);

export { app };
