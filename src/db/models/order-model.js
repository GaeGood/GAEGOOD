import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Order = model("Product", ProductSchema);

export { Order };
