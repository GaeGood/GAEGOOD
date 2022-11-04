import jwt from "jsonwebtoken";
import { userModel } from "../db";

async function loginRequired(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.json({
      resCode: 403,
      resMsg: {
        msg: "토큰이 존재하지 않습니다.",
      },
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(data.id);
    req.tokenPayload = data;
    req.loggedInUser = user;
    next();
  } catch (err) {
    return res.json({
      resCode: 403,
      resMsg: {
        msg: err,
      },
    });
  }
}
export { loginRequired };
