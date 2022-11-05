import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";
import { categoryModel } from "./category-model";

const Product = model("Product", ProductSchema);

class ProductModel {
  async findById(pid) {
    const product = await Product.findOne({ _id: pid }).populate("category");
    return product;
  }

  async findByIds(pidArr) {
    const productList = new Array();

    for (const pid of pidArr) {
      const product = await Product.findOne({ _id: pid }).populate("category");
      if (product) {
        productList.push(product);
      }
    }

    return productList;
  }

  async findAll() {
    const productList = await Product.find({}).populate("category");
    return productList;
  }

  async create(productInfo) {
    let createdNewProduct = await Product.create(productInfo);
    createdNewProduct = await createdNewProduct.populate("category");
    return createdNewProduct;
  }

  async update(pid, productInfo) {
    const filter = { _id: pid };
    const option = { returnOriginal: false };

    console.log(pid);
    console.log(productInfo);

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      productInfo,
      option
    ).populate("category");

    return updatedProduct;
  }

  async delete(pid) {
    await Product.deleteOne({ _id: pid });
  }

  async search(searchBy) {
    const { category } = searchBy;

    if (category) {
      const productCategory = await categoryModel.findByName(category);
      searchBy.category = productCategory._id;
    }

    const productList = await Product.find(searchBy).populate("category");

    if (productList.length > 0) {
      return productList;
    } else {
      return [];
    }
  }
}

const productModel = new ProductModel();

export { productModel };
