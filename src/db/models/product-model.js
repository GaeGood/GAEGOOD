import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {}

const userModel = new UserModel();

export { userModel };
