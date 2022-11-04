import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("Category", CategorySchema);

class CategoryModel {
  async findById(cid) {
    const category = await Category.findOne({ _id: cid });
    return category;
  }

  async findAll() {
    const categoryList = await Category.find({});
    return categoryList;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async update(cid, categoryInfo) {
    const filter = { _id: cid };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      categoryInfo,
      option
    );

    return updatedCategory;
  }

  async delete(cid) {
    await Category.deleteOne({ _id: cid });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
