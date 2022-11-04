import { userModel } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(email, password) {
    try {
      const user = await userModel.findByEmail(email);
      if (!user) {
        return {
          message: {
            resCode: "404",
            resMsg: {
              msg: "가입된 메일이 아닙니다.",
            },
          },
        };
      }

      const success = await bcrypt.compare(password, user.password);

      if (success) {
        const payload = {
          id: user._id,
          role: user.role,
        };
        const key = process.env.JWT_SECRET_KEY || "secret";
        const token = jwt.sign(payload, key, {
          expiresIn: "2h",
        });
        return {
          token: token,
          message: {
            resCode: "200",
            resMsg: {
              msg: "로그인 성공, jwt 토큰 발급",
            },
          },
        };
      } else {
        return {
          token: null,
          message: {
            resCode: "401",
            resMsg: {
              msg: "비밀번호가 일치하지 않습니다.",
            },
          },
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async logout() {
    try {
      return {
        message: {
          resCode: "200",
          resMsg: {
            msg: "정상적으로 로그아웃되었습니다. jwt token 삭제!",
          },
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

const authService = new AuthService(userModel);

export { authService };
