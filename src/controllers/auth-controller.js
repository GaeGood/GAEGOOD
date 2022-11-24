import { authService } from "../services";
class AuthController {
  async loginUser(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json("email,password 입력 필요!");
    }

    try {
      const token = await authService.loginUser(email, password);
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
      res.clearCookie("jwt_token");
      return res.status(200).json("로그아웃 되었습니다.");
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
    }
  }

  async renewPassword(req, res, next) {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json("이메일이 입력되지 않았습니다. 패스워드를 갱신할 수 없습니다.");
    }
    try {
      await authService.renewPassword(email);
      return res.status(200).json("비밀번호 찾기가 수행되었습니다.");
    } catch (err) {
      return res.status(400).json("비밀번호 찾기를 수행할 수 없습니다.");
    }
  }
}

const authController = new AuthController();

export { authController };
