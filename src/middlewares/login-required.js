import jwt from "jsonwebtoken";
import { userModel } from "../db";

async function loginRequired(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    const e = new Error("토큰이 존재하지 않습니다.");
    e.statusCode = 403;
    next(e);
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(data.id);
    req.tokenPayload = data;
    req.loggedInUser = user;
    next();
  } catch (err) {
    const e = new Error("JWT 토큰이 존재하지만, 검증에 실패했습니다.");
    e.statusCode = 403;
    next(e);
  }
}
export { loginRequired };
