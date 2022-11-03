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

  async join(name, password, email, role, address) {
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
}

const authService = new AuthService(userModel);

export { authService };
