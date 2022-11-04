import { Router } from "express";

import { productController } from "../controllers";
import { loginRequired } from "../middlewares/login-required";

const productRouter = Router();

productRouter.post("/", loginRequired, productController.addProduct);
productRouter.get("/", productController.getProductList);
productRouter.get("/search", productController.searchProduct);
productRouter.get("/:pid", productController.getProduct);
productRouter.put("/:pid", productController.editProduct);
productRouter.delete("/:pid", productController.removeProduct);

export { productRouter };
