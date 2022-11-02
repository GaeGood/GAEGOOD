import { productModel } from "../db";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

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

    const createdNewProduct = await this.productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProductById(pid) {
    const product = await this.productModel.findById(pid);
    return product;
  }

  async getProductList() {
    const productList = await this.productModel.findAll();
    return productList;
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

    const updatedProduct = await this.productModel.update(pid, productInfo);
    return updatedProduct;
  }

  async removeProduct(pid) {
    await this.productModel.delete(pid);
  }
}

const productService = new ProductService(productModel);

export { productService };
