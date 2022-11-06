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

  async verifyToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY || 10);
      const getUser = await userModel.findById(data.id); //PEPE 요청대로 User data 불러와서 뿌려줄 예정 , password 빼야한다고 판단하면 그때 리팩토링 하는걸로.
      return {
        message: {
          resCode: "200",
          resMsg: {
            msg: "정상적인 토큰",
            result: data,
            user: getUser,
          },
        },
      };
    } catch (err) {
      return {
        message: {
          resCode: "403",
          resMsg: {
            msg: "유효한 정상적인 토큰이 아니거나 가입된 _Id를 찾을 수 없습니다. ",
          },
        },
      };
    }
  }
}

const authService = new AuthService(userModel);

export { authService };
