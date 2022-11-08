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
      required: false,
    },
    role: {
      type: String,
      default: "basic-user",
    },
    postCode: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: true,
      // default: "입력값이 없습니다",
    },
    extraAddress: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
