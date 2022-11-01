import { userModel } from "../db";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {}

const userService = new UserService(userModel);

export { userService };
