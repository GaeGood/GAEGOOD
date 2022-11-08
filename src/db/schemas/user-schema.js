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
      default: "basic-user",
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    postCode: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: false,
    },
    extraAddress: {
      type: String,
      required: false,
    },
    orderList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export { UserSchema };
