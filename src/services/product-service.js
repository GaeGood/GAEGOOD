import { productModel } from "../db";

class ProductService {
  async addProduct(productInfo) {
    const {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
    } = productInfo;

    const createdNewProduct = await productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProductById(pid) {
    const product = await productModel.findById(pid);
    return product;
  }

  async getProductList(pidArr) {
    if (!pidArr) {
      const productList = await productModel.findAll();
      return productList;
    } else {
      const productList = await productModel.findByIds(pidArr);
      return productList;
    }
  }

  async editProduct(pid, productInfo) {
    const {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
    } = productInfo;

    const updatedProduct = await productModel.update(pid, productInfo);
    return updatedProduct;
  }

  async removeProduct(pid) {
    await productModel.delete(pid);
  }

  async searchProduct(searchBy) {
    const productList = await productModel.search(searchBy);
    return productList;
  }
}

const productService = new ProductService();

export { productService };
