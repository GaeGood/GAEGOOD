import { productModel } from "../db";

class ProductService {
  async addProduct(productInfo) {
    try {
      const createdNewProduct = await productModel.create(productInfo);
      return createdNewProduct;
    } catch (err) {
      const error = new Error("상품 추가에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async getProductById(pid) {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (err) {
      const error = new Error("ID기반 상품을 찾는데에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async getProductList(pidArr) {
    try {
      if (!pidArr) {
        const productList = await productModel.findAll();
        return productList;
      } else {
        const productList = await productModel.findByIds(pidArr);
        return productList;
      }
    } catch (err) {
      const error = new Error("상품 리스트를 불러오지 못하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async editProduct(pid, productInfo) {
    try {
      const updatedProduct = await productModel.update(pid, productInfo);
      return updatedProduct;
    } catch (err) {
      const error = new Error("상품 수정에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async removeProduct(pid) {
    try {
      await productModel.delete(pid);
    } catch (err) {
      const error = new Error("상품 삭제에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async searchProduct(searchBy) {
    try {
      const productList = await productModel.search(searchBy);
      return productList;
    } catch (err) {
      const error = new Error("상품 검색에 에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}

const productService = new ProductService();

export { productService };
