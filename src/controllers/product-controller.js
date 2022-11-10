import { productService } from "../services";

class ProductContoller {
  async addProduct(req, res, next) {
    console.log("req.body");
    console.log(req.body);

    console.log("req.file");
    console.log(req.file);

    const { name, category, shortDesc, longDesc, price, bigImageURL, stock } =
      req.body;

    const smallImageURL = "/public/images/product-images/" + req.file.filename;

    console.log("smallImageURL");
    console.log(smallImageURL);

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

  async getProductList(req, res, next) {
    if (Object.keys(req.query).length === 0) {
      const productList = await productService.getProductList();
      return res.status(200).json(productList);
    } else {
      const { pid } = req.query;

      if (!pid) {
        return res.status(400).json("에러, 쿼리 스트링에 pid이 존재해야 함");
      }
      const pidArr = pid.split(",");

      try {
        const productList = await productService.getProductList(pidArr);
        return res.status(200).json(productList);
      } catch (e) {
        next(e);
      }
    }
  }

  async getProduct(req, res, next) {
    const { pid } = req.params;

    try {
      const product = await productService.getProductById(pid);
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async editProduct(req, res, next) {
    const { pid } = req.params;

    try {
      const updatedProduct = await productService.editProduct(pid, req.body);
      return res.status(200).json(updatedProduct);
    } catch (e) {
      next(e);
    }
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

  async searchProduct(req, res, next) {
    if (Object.keys(req.query).length === 0) {
      try {
        const productList = await productService.getProductList();
        return res.status(200).json(productList);
      } catch (e) {
        next(e);
      }
    } else {
      try {
        const searchBy = req.query;
        const productList = await productService.searchProduct(searchBy);
        return res.status(200).json(productList);
      } catch (e) {
        next(e);
      }
    }
  }
}

const productController = new ProductContoller();

export { productController };
