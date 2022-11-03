import { Router } from "express";
import { authController } from "../controllers";
const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logoutUser);
authRouter.post("/join", authController.joinUser); //test용
// authRouter.post("/join", authController.joinUser);

// authRouter.post("/login", async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.json({
//       resCode: "404",
//       resMsg: {
//         msg: "email,password 입력 필요!",
//       },
//     });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ resCode: "404", resMsg: "가입된 메일이 아닙니다." });
//     }

//     const success = await bcrypt.compare(password, user.password);

//     if (success) {
//       const payload = {
//         id: user._id,
//       };
//       const key = process.env.JWT_SECRET_KEY || "secret";
//       const token = jwt.sign(payload, key, {
//         expiresIn: "2h",
//       });
//       res.cookie("jwt_token", token, { httpOnly: true });

//       return res.json({
//         resCode: "200",
//         resMsg: {
//           msg: "로그인 성공, jwt 토큰 발급",
//         },
//       });
//     } else {
//       return res.json({
//         resCode: "401",
//         resMsg: {
//           msg: "비밀번호가 일치하지 않습니다.",
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }

//   next();
// });

// authRouter.post("/join", async (req, res, next) => {
//   const { name, password, email, role, address } = req.body;
//   if (!name || !email || !role || !address) {
//     return res.json({
//       resCode: 404,
//       resMsg: "누락값이 있습니다.",
//     });
//   }

//   try {
//     const isDuplicate = await User.findOne({ email });
//     if (isDuplicate) {
//       return res.json({
//         resCode: 409,
//         resMsg: "이미 가입한 이메일이 존재합니다.",
//       });
//     } else {
//       const saltRound = parseInt(process.env.SALT_ROUND) || 10;
//       const hashPassword = await bcrypt.hash(password, saltRound);
//       const userInfo = await User.create({
//         email: email,
//         name: name,
//         password: hashPassword,
//         role: role,
//         address: address,
//       });

//       return res.json({
//         resCode: "200",
//         resMsg: {
//           msg: "회원가입 유저 생성 완료",
//           user: userInfo.email,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
//   next();
// });

// authRouter.get("/logout", async (req, res, next) => {
//   try {
//     res.clearCookie("jwt_token");
//     res.json({
//       resCode: "200",
//       resMsg: {
//         msg: "정상적으로 로그아웃되었습니다. jwt token 삭제!",
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
//   next();
// });

export { authRouter };
