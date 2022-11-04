import { Schema } from "mongoose";
// import { shortId } from "./types/short-Id";

const UserSchema = new Schema(
  {
    // shortId,
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
    address: {
      type: String,
      required: true,
      default: "서울특별시 선동구 성수성수2가3동 광나루로6길 49",
    },
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
