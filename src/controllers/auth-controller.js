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
        res.cookie("jwt_token", result.token, { httpOnly: true });
      }
      return res.json(result.message);
    } catch (e) {
      next(e);
    }
    next();
  }

  async logoutUser(req, res, next) {
    try {
      const result = await authService.logout();
      res.clearCookie("jwt_token");
      return res.json(result);
    } catch (err) {
      next(e);
    }
    next();
  }

  async joinUser(req, res, next) {
    const { name, password, email, role, address } = req.body;
    if (!name || !password || !email || !role || !address) {
      return res.json({
        resCode: "404",
        resMsg: {
          msg: "누락값이 있습니다.",
        },
      });
    }
    try {
      const result = await authService.join(
        name,
        password,
        email,
        role,
        address
      );
      return res.json(result);
    } catch (err) {
      next(err);
    }
    next();
  }
}

const authController = new AuthController();

export { authController };
