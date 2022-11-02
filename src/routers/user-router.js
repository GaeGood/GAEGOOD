import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";
import { userService } from "../services";
import { User } from "../db";

const userRouter = Router();

const user1 = {
  id: 1,
  name: "홍길동",
  email: "test1@gmail.com",
  role: "basic-user",
  address: "서울특별시",
};
const user2 = {
  id: 2,
  name: "강감찬",
  email: "test2@gmail.com",
  role: "basic-user",
  address: "부산광역시",
};
const user3 = {
  id: 3,
  name: "이순신",
  email: "test3@gmail.com",
  role: "basic-user",
  address: "대전광역시",
};

const userList = [user1, user2, user3];

//test
userRouter.get("/", async (req, res) => {
  res.json(userList);
});

//test
userRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const foundUser = userList.find((el) => el.id === Number(userId));
    res.json(foundUser);
  } catch (err) {
    next(err);
  }
});

// users/:userId
// userRouter.get("/users/:userId", async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.find({ userId });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }

//   next();
// });

// [Get] users/:userId?edit=true    : SSR => CSR 논의 나와서 rendering 고려한 rest api 재설계 필요
// [Put] users/:usersId
// [Delete] users/:userId

export { userRouter };
