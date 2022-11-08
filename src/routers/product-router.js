import { Router } from "express";
import { productController } from "../controllers";
import { loginRequired, adminRequired, bodyEmptyChecker } from "../middlewares";

const productRouter = Router();

productRouter.post(
  "/",
  loginRequired,
  adminRequired,
  productController.addProduct
);
productRouter.get("/", productController.getProductList);
productRouter.get("/search", productController.searchProduct);
productRouter.get("/:pid", productController.getProduct);
productRouter.put(
  "/:pid",
  bodyEmptyChecker,
  loginRequired,
  adminRequired,
  productController.editProduct
);
productRouter.delete(
  "/:pid",
  loginRequired,
  adminRequired,
  productController.removeProduct
);

export { productRouter };
