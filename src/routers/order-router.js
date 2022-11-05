import { Router } from "express";
import { orderController } from "../controllers";

const orderRouter = Router();

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/", orderController.getOrderList);
orderRouter.get("/:oid", orderController.getOrder);
orderRouter.put("/:oid", orderController.editOrder);
orderRouter.delete("/:oid", orderController.removeOrder);

export { orderRouter };
