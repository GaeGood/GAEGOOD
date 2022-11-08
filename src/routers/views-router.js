import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

//
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/join", serveStatic("join"));
viewsRouter.use("/cart", serveStatic("cart"));

// admin
viewsRouter.use("/admin-page", serveStatic("admin-page"))

// users
viewsRouter.use("/users/mypage", serveStatic("user-mypage"));
viewsRouter.use("/users/:uid/edit", serveStatic("user-edit"));
viewsRouter.use("/users/admin", serveStatic("user-admin"));

// products
viewsRouter.use("/products/create", serveStatic("product-create"));
viewsRouter.use("/products/list", serveStatic("product-list"));
viewsRouter.use("/products/:pid", serveStatic("product-detail"));
viewsRouter.use("/products/:pid/edit", serveStatic("product-edit"));

// categories
viewsRouter.use("/categories/create", serveStatic("category-create"));
viewsRouter.use("/categories/list", serveStatic("category-list"));
viewsRouter.use("/categories/:cid", serveStatic("category-detail"));
viewsRouter.use("/categories/:cid/edit", serveStatic("category-edit"));

// orders
viewsRouter.use("/orders/create", serveStatic("order-create"));
viewsRouter.use("/orders/complete", serveStatic("order-complete"));
viewsRouter.use("/orders/list", serveStatic("order-list"));
viewsRouter.use("/orders/:oid", serveStatic("order-detail"));
viewsRouter.use("/orders/:oid/edit", serveStatic("order-edit"));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
