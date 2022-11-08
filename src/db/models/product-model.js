import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";
import { categoryModel } from "./category-model";

const Product = model("Product", ProductSchema);

class ProductModel {
  async findById(pid) {
    try {
      const product = await Product.findOne({ _id: pid }).populate("category");
      return product;
    } catch (err) {
      const error = new Error("ID 기반으로 검색 상품 탐색에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async findByIds(pidArr) {
    try {
      const productList = new Array();

      for (const pid of pidArr) {
        const product = await Product.findOne({ _id: pid }).populate(
          "category"
        );
        if (product) {
          productList.push(product);
        }
      }
      return productList;
    } catch (err) {
      const error = new Error("ID기반 상품 리스트 검색에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async findAll() {
    try {
      const productList = await Product.find({}).populate("category");
      return productList;
    } catch (err) {
      const error = new Error("상품 수정에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async create(productInfo) {
    try {
      let createdNewProduct = await Product.create(productInfo);
      createdNewProduct = await createdNewProduct.populate("category");
      return createdNewProduct;
    } catch (err) {
      const error = new Error("상품 생성에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async update(pid, productInfo) {
    const filter = { _id: pid };
    const option = { returnOriginal: false };

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        filter,
        productInfo,
        option
      ).populate("category");

      return updatedProduct;
    } catch (err) {
      const error = new Error("상품 수정에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async delete(pid) {
    await Product.deleteOne({ _id: pid });
  }

  async search(searchBy) {
    const { category } = searchBy;
    try {
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
    } catch (err) {
      const error = new Error("상품 검색에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}

const productModel = new ProductModel();

export { productModel };
