import { Router } from "express";

const globalRouter = Router();

globalRouter.get("/", (req, res) => {
  res.render("home/home.html");
});

export { globalRouter };
