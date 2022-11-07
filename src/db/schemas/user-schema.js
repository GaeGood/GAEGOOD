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
    phoneNumber: {
      type: String,
      required: true,
      default: "입력값이 없습니다",
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
    postCode: {
      type: String,
      required: true,
      default: "입력값이 없습니다",
    },
    address: {
      type: String,
      required: true,
      default: "입력값이 없습니다",
    },
    extraAddress: {
      type: String,
      required: true,
      default: "입력값이 없습니다",
    },
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
