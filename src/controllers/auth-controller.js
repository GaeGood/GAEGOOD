import { authService } from "../services";

class AuthController {
  async loginUser(req, res, next) {
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
      const result = await authService.login(email, password);
      if (result.token) {
        res.cookie("jwt_token", result.token);
      }
      return res.json(result.message);
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req, res, next) {
    try {
      const result = await authService.logout();
      res.clearCookie("jwt_token");
      return res.json(result.message);
    } catch (err) {
      next(err);
    }
  }

  async verifyToken(req, res, next) {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res.status(401).json({
        resMsg: {
          msg: "토큰이 존재하지 않습니다. 로그인이 되어있지 않습니다.",
        },
      });
    }
    try {
      const result = await authService.verifyToken(token);
      return res.json(result.message);
    } catch (err) {
      next(err);
    }
  }
}

const authController = new AuthController();

export { authController };
