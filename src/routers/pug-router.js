import express from "express";
import { productModel } from "../db";

const pugRouter = express.Router();

pugRouter.get("/", async (req, res) => {
  const productList = await productModel.findAll();

  return res.render("home.pug", { productList });
});

pugRouter.get("/product/detail/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productModel.findById(pid);

  return res.render("product-detail.pug", { product });
});

export { pugRouter };
