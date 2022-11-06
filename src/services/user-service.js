import { userModel } from "../db";
import bcrypt from "bcrypt";
class UserService {
  async addUser(userInfo) {
    const { email, name, password, role, address } = userInfo;
    try {
      const isDuplicate = await userModel.findByEmail(email);
      if (isDuplicate) {
        return {
          resCode: 409,
          resMsg: {
            msg: "이미 가입한 이메일이 존재합니다.",
          },
        };
      } else {
        const saltRound = parseInt(process.env.SALT_ROUND) || 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        const userInfo = await userModel.create({
          email: email,
          name: name,
          password: hashPassword,
          role: role,
          address: address,
        });
        return {
          resCode: "200",
          resMsg: {
            msg: "회원가입 유저 생성 완료",
            user: userInfo.email,
          },
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserById(uid) {
    const user = await userModel.findById(uid);
    return user;
  }

  async editUser(uid, userInfo) {
    const { password, name, address, phoneNumber, postCode, extraAddress } = userInfo;
    const saltRound = parseInt(process.env.SALT_ROUND) || 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    const updatedUser = await userModel.update(uid, {
      name: name,
      password: hashPassword,
      phoneNumber: phoneNumber,
      postCode: postCode,
      address: address,
      extraAddress: extraAddress,
    });
    return updatedUser;
  }

  async removeUser(uid) {
    await userModel.delete(uid);
  }
}

const userService = new UserService(userModel);

export { userService };
