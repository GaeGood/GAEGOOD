import { categoryModel } from "../db";

class CategoryService {
  async addCategory(categoryInfo) {
    const { name } = categoryInfo; //PEPE가 name으로 구조분해할당 한 의도 모르겠음. 일단 에러처리 적용하겠음.
    const createdNewCategory = await categoryModel.create(categoryInfo);
    return createdNewCategory;
  }

  async getCategoryById(cid) {
    const category = await categoryModel.findById(cid);
    return category;
  }

  async getCategoryByName(name) {
    const category = await categoryModel.findByName(name);
    return category;
  }

  async getCategoryList() {
    const categoryList = await categoryModel.findAll();
    return categoryList;
  }

  async editCategory(cid, categoryInfo) {
    const updatedcategory = await categoryModel.update(cid, categoryInfo);
    return updatedcategory;
  }

  async removeCategory(cid) {
    await categoryModel.delete(cid);
  }
}

const categoryService = new CategoryService();

export { categoryService };
