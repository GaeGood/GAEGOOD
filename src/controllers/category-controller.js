import { categoryService } from "../services";

class CategoryContoller {
  async addCategory(req, res, next) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json("name을 입력하세요");
    }

    try {
      const createdNewCategory = await categoryService.addCategory({
        name,
      });
      return res.status(200).json(createdNewCategory);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryList(req, res) {
    const categoryList = await categoryService.getCategoryList();
    return res.status(200).json(categoryList);
  }

  async getCategoryById(req, res) {
    const { cid } = req.params;

    const Category = await categoryService.getCategoryById(cid);
    res.status(200).json(Category);
  }

  async getCategoryByName(req, res) {
    const name = req.query.category;

    const Category = await categoryService.getCategoryByName(name);
    res.status(200).json(Category);
  }

  async editCategory(req, res) {
    const { cid } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(200).json("입력 데이터 부족");
    }

    const updatedCategory = await categoryService.editCategory(cid, {
      name,
    });

    return res.status(200).json(updatedCategory);
  }

  async removeCategory(req, res, next) {
    const { cid } = req.params;

    try {
      await categoryService.removeCategory(cid);
      res.status(200).json(`카테고리 삭제 완료(ID : ${cid})`);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryContoller();

export { categoryController };
