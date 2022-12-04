import { userModel } from "../db";
import { userService } from "./user-service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(email, password) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      const error = new Error("가입 된 메일이 아닙니다.");
      error.statusCode = 422;
      throw error;
    }

    const success = await bcrypt.compare(password, user.password);
    if (success) {
      const payload = {
        id: user._id,
        role: user.role,
      };
      const key = process.env.JWT_SECRET_KEY || "secret";
      try {
        const token = jwt.sign(payload, key, {
          expiresIn: "2h",
        });
        return token;
      } catch (err) {
        const error = new Error("토큰 생성도중 에러가 발생하였습니다. ");
        error.statusCode = 400;
        throw error;
      }
    } else {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      error.statusCode = 401;
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY || 10);
      const getUser = await userModel.findById(data.id); //PEPE 요청대로 User data 불러와서 뿌려줄 예정 , password 빼야한다고 판단하면 그때 리팩토링 하는걸로.
      return getUser;
    } catch (err) {
      const error = new Error(
        "유효한 정상적인 토큰이 아니거나 가입된 _Id를 찾을 수 없습니다."
      );
      error.statusCode = 403;
      throw error;
    }
  }

  async renewPassword(email) {
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.AUTH_GMAIL_USER,
        pass: process.env.AUTH_GMAIL_PASS,
      },
    });
    const message = {
      from: process.env.AUTH_GMAIL_USER,
      to: email,
      subject: "Gaegood.com 패스워드 변경알림",
      text: "mail testing",
    };
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    message.text = `Password : ${password}`;
    Object.freeze(message);

    try {
      const User = await userModel.findByEmail(email);
      const id = User.id;
      try {
        await userService.editUser(id, { password });
      } catch (err) {
        const error = new Error(
          " 유저 임시비밀번호 부여 후 수정도중 에러가 발생하였습니다."
        );
        error.statusCode = 400;
        throw error;
      }
    } catch (err) {
      const error = new Error("찾으려는 계정이 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }
    transport.sendMail(message, (err, info) => {
      if (err) {
        const error = new Error("Sending new password failed");
        error.statusCode = 400;
        throw error;
      }
    });
  }
}

const authService = new AuthService(userModel);

export { authService };
