import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("Order", OrderSchema);

export { Order };
