import { Router } from "express";
import { authController } from "../controllers";
import { userModel } from "../db"; //front test위해 임시로 가져옴
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logoutUser);

//Front token 유효성 테스트 전용

// /api/auth/login => 성공하면 토큰 발급해주는얘야

// /api/auth/verifytoken => 토큰 진위여부 판단해서 너가 들고있는 Cookie안의 JWT가 맞는 형식이고,
//                          너가 인증된 사용자니까 다른 인가된 행위를 할 수 있게 해줄게.
//                         if resCode==200
//                           {
//                             시도 : myPage.html => Cookie의 JWT의 Payload의 id를  myPage/:userId 이라던지 데이터가져와서 화면 구성하면됨.
//                           }
//PEPE 요청 : res.status(401).json() 형식이었으면 좋겠다, User 자체를 뿌려줬으면 좋겠다. << 반영할예정

authRouter.use("/verifyToken", async (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(401).json({
      resMsg: {
        msg: "토큰이 존재하지 않습니다. 로그인이 되어있지 않습니다.",
      },
    });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const getUser = await userModel.findById(data.id); //PEPE 요청대로 User data 불러와서 뿌려줄 예정 , password 빼야한다고 판단하면 그때 리팩토링 하는걸로.

    res.status(200).json({
      resMsg: {
        msg: "정상적인 토큰",
        result: data,
        user: getUser,
      },
    });
  } catch (err) {
    return res.status(403).json({
      resMsg: {
        msg: "유효한 정상적인 토큰이 아니거나 가입된 _Id를 찾을 수 없습니다. ",
      },
    });
  }
  next();
});

export { authRouter };
