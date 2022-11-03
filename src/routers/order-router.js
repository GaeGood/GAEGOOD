import { Router } from "express";
import { orderController } from "../controllers";

const orderRouter = Router();

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/", orderController.getOrderList);
orderRouter.get("/:pid", orderController.getOrder);
orderRouter.put("/:pid", orderController.editOrder);
orderRouter.delete("/:pid", orderController.removeOrder);

export { orderRouter };
