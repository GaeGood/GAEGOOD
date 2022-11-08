import { userModel } from "../db";
import bcrypt from "bcrypt";
class UserService {
  async addUser(userInfo) {
    const { email, name, password, role, address } = userInfo;

    const isDuplicate = await userModel.findByEmail(email);
    if (isDuplicate) {
      const error = new Error("이미 가입한 이메일이 존재합니다.");
      error.statusCode = 409;
      throw error;
    }
    try {
      const saltRound = parseInt(process.env.SALT_ROUND) || 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
      const userInfo = await userModel.create({
        email: email,
        name: name,
        password: hashPassword,
        role: role,
        address: address,
      });
      return userInfo;
    } catch (err) {
      const error = new Error(
        " 회원가입도중 password Hash와 User 추가과정에서 에러가 발생하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async getUserById(uid) {
    const user = await userModel.findById(uid);
    return user;
  }

  async editUser(uid, userInfo) {
    const { password, name, address, phoneNumber, postCode, extraAddress } =
      userInfo;
    const saltRound = parseInt(process.env.SALT_ROUND) || 10;
    try {
      const hashPassword = await bcrypt.hash(password, saltRound);
      const updatedUser = await userModel.update(uid, {
        name,
        password: hashPassword,
        address,
        phoneNumber,
        postCode,
        extraAddress,
      });
      return updatedUser;
    } catch (err) {
      const error = new Error(
        " 회원정보 수정 도중 password Hash와 User 수정시도과정에서 에러가 발생하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async removeUser(uid) {
    await userModel.delete(uid);
  }
}

const userService = new UserService(userModel);

export { userService };
