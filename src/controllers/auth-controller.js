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
    const isLogin = authService.login(email,password)

    if (isLogin) {
      
    }
    //authService.login(email, password);
    
    next();
  }

  async logoutUser(req, res, next) {
    authService.logout();
    next();
  }

  async joinUser(req, res, next) {
    const { name, password, email, role, address } = req.body;
    if (!name || !password || !email || !role || !address) {
      return res.json({
        resCode: 404,
        resMsg: "누락값이 있습니다.",
      });
    }

    authService.join(name, password, email, role, address);

    next();
  }
}

const authController = new AuthController();

export { authController };
