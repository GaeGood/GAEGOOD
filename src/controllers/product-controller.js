import { productService } from "../services";

class ProductContoller {
  async addProduct(req, res) {
    const {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
    } = req.body;

    if (
      !name ||
      !category ||
      !shortDesc ||
      !longDesc ||
      !price ||
      !smallImageURL ||
      !bigImageURL
    ) {
      return res.json("입력 데이터 부족");
    }

    const createdNewProduct = await productService.addProduct({
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
    });

    return res.json(createdNewProduct);
  }

  async getProductList(req, res) {
    const productList = await productService.getProductList();
    res.json(productList);
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
    } = req.body;

    if (
      !name ||
      !category ||
      !shortDesc ||
      !longDesc ||
      !price ||
      !smallImageURL ||
      !bigImageURL
    ) {
      return res.json("입력 데이터 부족");
    }

    const updatedProduct = await productService.editProduct(pid, {
      name,
      category,
      shortDesc,
      longDesc,
      price,
      smallImageURL,
      bigImageURL,
    });

    return res.json(updatedProduct);
  }

  async removeProduct(req, res, next) {
    const { pid } = req.params;

    try {
      await productService.removeProduct(pid);
      res.json(`상품 삭제 완료(ID : ${pid})`);
    } catch (e) {
      next(e);
    }
  }
}

const productController = new ProductContoller();

export { productController };
