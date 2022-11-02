import { Router } from "express";
import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      resCode: "404",
      resMsg: {
        msg: "email,password 입력 필요!",
      },
    });
  }

  try {
    const user = await User.find({ email });
    if (user.length < 1) {
      return res.json({ resCode: "404", resMsg: "가입된 메일이 아닙니다." });
    }

    const success = await bcrypt.compare(password, user[0].password);

    if (success) {
      const payload = {
        user_id: user.userId,
      };
      const key = process.env.JWT_SECRET_KEY || "secret";
      const token = jwt.sign(payload, key, {
        expiresIn: "2h",
      });
      res.cookie("jwt_token", token, { httpOnly: true });

      return res.json({
        resCode: "200",
        resMsg: {
          msg: "로그인 성공, jwt 토큰 발급",
        },
      });
    } else {
      return res.json({
        resCode: "401",
        resMsg: {
          msg: "비밀번호가 일치하지 않습니다.",
        },
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

  next();
});

authRouter.post("/join", async (req, res, next) => {
  const { name, password, email, role, address } = req.body;
  if (!name || !email || !role || !address) {
    return res.json({
      resCode: 404,
      resMsg: "누락값이 있습니다.",
    });
  }

  try {
    const saltRound = parseInt(process.env.SALT_ROUND) || 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    const userInfo = await User.create({
      email: email,
      name: name,
      password: hashPassword,
      role: role,
      address: address,
    });

    res.json({
      resCode: "200",
      resMsg: {
        msg: "회원가입 유저 생성 완료",
        user: userInfo.email,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
});

export { authRouter };
