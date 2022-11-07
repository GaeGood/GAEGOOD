import { productService } from "../services";

class ProductContoller {
  async addProduct(req, res, next) {
    const {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
      stock,
    } = req.body;

    if (
      !name ||
      !category ||
      !shortDesc ||
      !longDesc ||
      !price ||
      !smallImageURL ||
      !bigImageURL ||
      !stock
    ) {
      return res.status(400).json("입력 데이터 부족");
    }

    try {
      const createdNewProduct = await productService.addProduct({
        name,
        category,
        shortDesc,
        longDesc,
        price,
        smallImageURL,
        bigImageURL,
        stock,
      });
      return res.status(200).json(createdNewProduct);
    } catch (e) {
      next(e);
    }
  }

  async getProductList(req, res) {
    if (Object.keys(req.query).length === 0) {
      const productList = await productService.getProductList();
      return res.status(200).json(productList);
    } else {
      const { pid } = req.query;

      if (!pid) {
        return res.status(400).json("에러, 쿼리 스트링에 pid이 존재해야 함");
      }
      const pidArr = pid.split(",");
      const productList = await productService.getProductList(pidArr);
      return res.status(200).json(productList);
    }
  }

  async getProduct(req, res) {
    const { pid } = req.params;

    const product = await productService.getProductById(pid);
    res.status(200).json(product);
  }

  async editProduct(req, res) {
    const { pid } = req.params;
    const {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
      stock,
    } = req.body;

    if (
      !name ||
      !category ||
      !shortDesc ||
      !longDesc ||
      !price ||
      !smallImageURL ||
      !bigImageURL ||
      !stock
    ) {
      return res.status(400).json("입력 데이터 부족");
    }

    const updatedProduct = await productService.editProduct(pid, {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
      stock,
    });

    return res.status(200).json(updatedProduct);
  }

  async removeProduct(req, res, next) {
    const { pid } = req.params;

    try {
      await productService.removeProduct(pid);
      res.status(200).json(`상품 삭제 완료(ID : ${pid})`);
    } catch (e) {
      next(e);
    }
  }

  async searchProduct(req, res) {
    if (Object.keys(req.query).length === 0) {
      const productList = await productService.getProductList();
      return res.status(200).json(productList);
    } else {
      const searchBy = req.query;
      const productList = await productService.searchProduct(searchBy);
      res.status(200).json(productList);
    }
  }
}

const productController = new ProductContoller();

export { productController };
