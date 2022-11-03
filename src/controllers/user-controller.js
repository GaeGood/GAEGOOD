import { userService } from "../services";

class UserContoller {
  async addUser(req, res, next) {
    const { email, password, name, role, address } = req.body;
    console.log("UserController Password", password);
    if (!email || !password || !name || !role || !address) {
      return res.json({
        resCode: "404",
        resMsg: {
          msg: "입력되지 않은 값이 있습니다!",
        },
      });
    }
    try {
      const result = await userService.addUser({
        name,
        password,
        email,
        role,
        address,
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
    next();
  }

  async getUser(req, res, next) {
    const { userId } = req.params;
    try {
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (err) {
      return res.json({
        resCode: 404,
        resMsg: {
          msg: err,
        },
      });
    }
  }

  async editUser(req, res) {
    const { userId } = req.params;
    const { password, name, address } = req.body;

    if (!password || !name || !address) {
      return res.json("입력 데이터 부족");
    }
    try {
      const updatedUser = await userService.editUser(userId, {
        password,
        name,
        address,
      });

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
    next();
  }

  async removeUser(req, res, next) {
    const { userId } = req.params;

    try {
      await userService.removeUser(userId);
      res.json(`유저 삭제 완료(ID : ${userId})`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

const userController = new UserContoller();

export { userController };
