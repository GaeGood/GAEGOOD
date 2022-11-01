import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("User", UserSchema);

export { User };
