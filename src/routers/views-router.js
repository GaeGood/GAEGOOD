import express from "express";
import path from "path";
import {
  loginRequiredPage,
  adminRequiredPage,
  orderOwnerRequiredPage,
} from "../middlewares";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

//
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/cart", serveStatic("cart"));

// users
viewsRouter.use("/users/mypage", loginRequiredPage, serveStatic("user-mypage"));
viewsRouter.use(
  "/users/admin",
  loginRequiredPage,
  adminRequiredPage,
  serveStatic("user-admin")
);
viewsRouter.use(
  "/users/likes-products",
  loginRequiredPage,
  serveStatic("likes-products")
);

// products
viewsRouter.use("/products/:pid", serveStatic("product-detail"));

// orders
viewsRouter.use(
  "/orders/create",
  loginRequiredPage,
  serveStatic("order-create")
);
viewsRouter.use(
  "/orders/complete",
  loginRequiredPage,
  serveStatic("order-complete")
);
viewsRouter.use("/orders/list", loginRequiredPage, serveStatic("order-list"));
viewsRouter.use(
  "/orders/:oid",
  loginRequiredPage,
  orderOwnerRequiredPage,
  serveStatic("order-detail")
);

viewsRouter.use(
  "/error-page/login-required",
  serveStatic("error-page", "login-required")
);

viewsRouter.use(
  "/error-page/admin-required",
  serveStatic("error-page", "admin-required")
);

viewsRouter.use(
  "/error-page/order-owner-required",
  serveStatic("error-page", "order-owner-required")
);

viewsRouter.use(
  "/find-password",
  serveStatic("find-password", "find-password")
);
// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource, fileName) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  let option = { index: `${resource}.html` };

  if (fileName) {
    option = { index: `${fileName}.html` };
  }

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
