import { categoryModel } from "../db";

class CategoryService {
  async addCategory(categoryInfo) {
    const { name } = categoryInfo; //PEPE가 name으로 구조분해할당 한 의도 모르겠음. 일단 에러처리 적용하겠음.
    try {
      const createdNewCategory = await categoryModel.create(categoryInfo);
      return createdNewCategory;
    } catch (err) {
      const error = new Error("카테고리 생성 도중 에러가 발생하였습니다. ");
      error.statusCode = 400;
      throw error;
    }
  }

  async getCategoryById(cid) {
    try {
      const category = await categoryModel.findById(cid);
      return category;
    } catch (err) {
      const error = new Error(
        "ID기반 카테고리 조회 도중 에러가 발생하였습니다. "
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async getCategoryByName(name) {
    try {
      const category = await categoryModel.findByName(name);
      return category;
    } catch (err) {
      const error = new Error(
        "이름기반 카테고리 조회도중 에러가 발생하였습니다. "
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async getCategoryList() {
    try {
      const categoryList = await categoryModel.findAll();
      return categoryList;
    } catch (err) {
      const error = new Error(
        "카테고리 리스트 조회 생성도중 에러가 발생하였습니다. "
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async editCategory(cid, categoryInfo) {
    const { name } = categoryInfo; //마찬가지로 PEPE가 어떤 의도로 구조분해할당 하려고 했는지 알수없음. 일단 error handler 적용하겠음.

    try {
      const updatedcategory = await categoryModel.update(cid, categoryInfo);
      return updatedcategory;
    } catch (err) {
      const error = new Error("카테고리 수정도중 에러가 발생하였습니다. ");
      error.statusCode = 400;
      throw error;
    }
  }

  async removeCategory(cid) {
    try {
      await categoryModel.delete(cid);
    } catch (err) {
      const error = new Error("카테고리 삭제도중 에러가 발생하였습니다. ");
      error.statusCode = 400;
      throw error;
    }
  }
}

const categoryService = new CategoryService();

export { categoryService };
