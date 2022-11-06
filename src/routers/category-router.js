import { Router } from "express";

import { categoryController } from "../controllers";

const categoryRouter = Router();

categoryRouter.post("/", categoryController.addCategory);
categoryRouter.get("/", categoryController.getCategoryList);
categoryRouter.get("/search", categoryController.getCategoryByName);
categoryRouter.get("/:cid", categoryController.getCategoryById);
categoryRouter.put("/:cid", categoryController.editCategory);
categoryRouter.delete("/:cid", categoryController.removeCategory);

export { categoryRouter };
