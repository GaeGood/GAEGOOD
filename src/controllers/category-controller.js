import { categoryService } from "../services";

class CategoryContoller {
  async addCategory(req, res, next) {
    const { name } = req.body;

    if (!name) {
      return res.json("name을 입력하세요");
    }

    try {
      const createdNewCategory = await categoryService.addCategory({
        name,
      });
      return res.json(createdNewCategory);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryList(req, res) {
    const categoryList = await categoryService.getCategoryList();
    return res.json(categoryList);
  }

  async getCategoryById(req, res) {
    const { cid } = req.params;

    const Category = await categoryService.getCategoryById(cid);
    res.json(Category);
  }

  async getCategoryByName(req, res) {
    const name = req.query.category;

    const Category = await categoryService.getCategoryByName(name);
    res.json(Category);
  }

  async editCategory(req, res) {
    const { cid } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.json("입력 데이터 부족");
    }

    const updatedCategory = await categoryService.editCategory(cid, {
      name,
    });

    return res.json(updatedCategory);
  }

  async removeCategory(req, res, next) {
    const { cid } = req.params;

    try {
      await categoryService.removeCategory(cid);
      res.json(`카테고리 삭제 완료(ID : ${cid})`);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryContoller();

export { categoryController };
