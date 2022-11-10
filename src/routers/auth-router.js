import { Router } from "express";
import { authController } from "../controllers";
import nodemailer from "nodemailer";
import { userModel } from "../db";
import { userService } from "../services";
const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.get("/verifyToken", authController.verifyToken);
authRouter.post("/renewPassword", async (req, res, next) => {
  const { email } = req.body;

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

  // let editId;
  try {
    const User = await userModel.findByEmail(email);
    console.log(User);
    const id = User.id;
    try {
      const userInfo = await userService.editUser(id, { password });
      res.status(200).json(userInfo);
    } catch (err) {
      const error = new Error(" 비밀번호 찾기 도중 도중 에러가 발생했습니다.");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    res.status(400).json("찾으려는 계정이 존재하지 않습니다.");
  }
  console.log(password);
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(400).json("failed");
    }
    return res.status(400).json(info);
  });
});

export { authRouter };
