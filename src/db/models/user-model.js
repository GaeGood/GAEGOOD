import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("User", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(uid) {
    const user = await User.findOne({ _id: uid });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, userInfo }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, userInfo, option);
    return updatedUser;
  }
  async delete(uid) {
    await User.deleteOne({ _id: uid });
  }
}

const userModel = new UserModel();

export { userModel };
