import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
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
    res.json({
      resCode: 200,
      resMsg: {
        msg: "정상적인 토큰",
        result: data,
      },
    });
  } catch (err) {
    return res.json({
      resCode: 403,
      resMsg: {
        msg: err,
      },
    });
  }
  next();
}
export { loginRequired };
