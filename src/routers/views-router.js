import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.get("/", (req, res) => {
  res.render("home/home.ejs");
});
//viewsRouter.get("/", (req, res) => res.render("home"));

export { viewsRouter };
