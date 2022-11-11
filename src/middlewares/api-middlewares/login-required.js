import jwt from "jsonwebtoken";
import { userModel } from "../../db";

async function loginRequired(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    const e = new Error("로그인하지 않아, 이 API에 대한 사용을 불허합니다.");
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
    const e = new Error("로그인하지 않아, 이 API에 대한 사용을 불허합니다.");
    e.statusCode = 403;
    next(e);
  }
}
export { loginRequired };
