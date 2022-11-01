import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
