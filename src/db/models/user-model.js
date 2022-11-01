import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const userModel = model("users", UserSchema);

export { userModel };
