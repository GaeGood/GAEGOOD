import { Router } from "express";
import { orderController } from "../controllers";
import { bodyEmptyChecker } from "../middlewares";

const orderRouter = Router();

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/", orderController.getOrderList);
orderRouter.get("/:oid", orderController.getOrder);
orderRouter.put("/:oid", bodyEmptyChecker, orderController.editOrder);
orderRouter.delete("/:oid", orderController.removeOrder);

export { orderRouter };
