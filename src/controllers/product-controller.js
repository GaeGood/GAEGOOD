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
    if (Object.keys(req.query).length === 0) {
      return res.json("에러, 쿼리 스트링이 존재해야 함");
    } else {
      const { getAll } = req.query;
      if (!getAll) {
        return res.json("에러, 쿼리 스트링에 getAll이 존재해야 함");
      }

      if (getAll !== "true" && getAll !== "false") {
        return res.json(
          "에러, 쿼리 스트링에 getAll의 값이 true 또는 false 여야 함"
        );
      }

      if (getAll === "true") {
        const productList = await productService.getProductList();
        return res.json(productList);
      } else {
        const { pid } = req.query;

        if (!pid) {
          return res.json("에러, 쿼리 스트링에 pid이 존재해야 함");
        }
        const pidArr = pid.split(",");
        const productList = await productService.getProductList(pidArr);
        return res.json(productList);
      }
    }
  }

  async getProduct(req, res) {
    const { pid } = req.params;

    const product = await productService.getProductById(pid);
    res.json(product);
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
