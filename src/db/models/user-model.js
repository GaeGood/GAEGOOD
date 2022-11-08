import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("User", UserSchema);

export class UserModel {
  async findByEmail(email) {
    try {
      const user = await User.findOne({ email }).populate("orderList");
      return user;
    } catch (err) {
      const error = new Error("User 검색 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }

  async findById(uid) {
    try {
      const user = await User.findOne({ _id: uid }).populate("orderList");
      return user;
    } catch (err) {
      const error = new Error("User 검색 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }

  async create(userInfo) {
    try {
      const createdNewUser = await User.create(userInfo);
      return createdNewUser;
    } catch (err) {
      const error = new Error("User 생성 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await User.find({}).populate("orderList");
      return users;
    } catch (err) {
      const error = new Error("User 전체검색 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }

  async update(userId, userInfo) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };
    try {
      const updatedUser = await User.findOneAndUpdate(
        filter,
        userInfo,
        option
      ).populate("orderList");
      return updatedUser;
    } catch (err) {
      const error = new Error("User 수정 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }
  async delete(uid) {
    try {
      await User.deleteOne({ _id: uid });
    } catch (err) {
      const error = new Error("User 삭제 도중 에러가 발생하였습니다.");
      error.statusCode = 404;
      throw error;
    }
  }
}

const userModel = new UserModel();

export { userModel };
