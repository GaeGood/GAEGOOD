import { Router } from "express";

import { categoryController } from "../controllers";
import { bodyEmptyChecker } from "../middlewares";

const categoryRouter = Router();

categoryRouter.post("/", categoryController.addCategory);
categoryRouter.get("/", categoryController.getCategoryList);
categoryRouter.get("/search", categoryController.getCategoryByName);
categoryRouter.get("/:cid", categoryController.getCategoryById);
categoryRouter.put("/:cid", bodyEmptyChecker, categoryController.editCategory);
categoryRouter.delete("/:cid", categoryController.removeCategory);

export { categoryRouter };
