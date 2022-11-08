import { authService } from "../services";

class AuthController {
  async loginUser(req, res, next) {
    if (!email || !password) {
      return res.status(404).json("email,password 입력 필요!");
    }

    try {
      const token = await authService.login(email, password);
      if (token) {
        res.cookie("jwt_token", token);
      }
      return res.status(200).json("로그인 성공, 토큰발급!");
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req, res, next) {
    try {
      await authService.logout();
      return res.status(200).json("로그아웃 되었습니다.");
    } catch (err) {
      next(err);
    }
  }

  async verifyToken(req, res, next) {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res
        .status(401)
        .json("토큰이 존재하지 않습니다. 로그인이 되어있지 않습니다.");
    }
    try {
      const result = await authService.verifyToken(token);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const authController = new AuthController();

export { authController };
