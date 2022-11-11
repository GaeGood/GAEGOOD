import jwt from "jsonwebtoken";
import { userModel } from "../../db";

async function loginRequiredPage(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(500).redirect("/error-page/login-required");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(data.id);
    req.tokenPayload = data;
    req.loggedInUser = user;
    next();
  } catch (err) {
    return res.status(500).redirect("/error-page/login-required");
  }
}
export { loginRequiredPage };
