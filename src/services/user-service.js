import { userModel } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  async addUser(userInfo) {
    const { email, password } = userInfo;

    const isDuplicate = await userModel.findByEmail(email);
    if (isDuplicate) {
      const error = new Error("이미 가입한 이메일이 존재합니다.");
      error.statusCode = 409;
      throw error;
    }
    try {
      const saltRound = parseInt(process.env.SALT_ROUND) || 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
      userInfo.password = hashPassword;
      const user = await userModel.create(userInfo);
      const payload = {
        id: user._id,
        role: user.role,
      };
      const key = process.env.JWT_SECRET_KEY || "secret";
      const token = jwt.sign(payload, key, {
        expiresIn: "2h",
      });
      return { user, token };
    } catch (err) {
      const error = new Error(" 회원가입 도중 에러가 발생했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async getUserList() {
    const userList = await userModel.findAll();
    return userList;
  }

  async getUserById(uid) {
    const user = await userModel.findById(uid);
    return user;
  }

  async editUser(uid, userInfo) {
    const { password } = userInfo;
    if (password) {
      const saltRound = parseInt(process.env.SALT_ROUND) || 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
      userInfo.password = hashPassword;
    }
    const updatedUser = await userModel.update(uid, userInfo);
    return updatedUser;
  }

  async removeUser(uid) {
    await userModel.delete(uid);
  }
}

const userService = new UserService(userModel);

export { userService };
