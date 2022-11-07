import { userService } from "../services";

class UserContoller {
  async addUser(req, res, next) {
    const { email, password, name, address } = req.body;

    if (!email || !password || !name || !address) {
      return res.status(400).json("입력되지 않은 값이 있습니다!");
    }

    try {
      const result = await userService.addUser({
        name,
        password,
        email,
        role: "basic-user",
        address,
      });
      return res.status(200).json(result); // case1
    } catch (err) {
      next(err);
    }
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

  async editUser(req, res, next) {
    const { userId } = req.params;
    const { password, name, postCode, address, extraAddress, phoneNumber } = req.body;

    if (!password || !name || !phoneNumber || !postCode || !address || !extraAddress ) {
      return res.json("입력 데이터 부족");
    }
    try {
      const updatedUser = await userService.editUser(userId, {
        password,
        name,
        phoneNumber,
        postCode,
        address,
        extraAddress,
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
      res.clearCookie("jwt_token");
      res.json(`유저 삭제 완료(ID : ${userId})`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

const userController = new UserContoller();

export { userController };
