import { Router } from "express";
import { productController } from "../controllers";
import {
  loginRequired,
  adminRequired,
  bodyEmptyChecker,
  productImageUpload,
} from "../middlewares";

const productRouter = Router();

productRouter.post(
  "/",
  loginRequired,
  adminRequired,
  productImageUpload.single("productImage"),
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
  productImageUpload.single("productImage"),
  productController.editProduct
);
productRouter.delete(
  "/:pid",
  loginRequired,
  adminRequired,
  productController.removeProduct
);

export { productRouter };
