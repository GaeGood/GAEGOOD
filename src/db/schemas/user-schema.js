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
      default: "",
    },
    postCode: {
      type: String,
      default: "",
    },
    streetAddress: {
      type: String,
      default: "",
    },
    extraAddress: {
      type: String,
      default: "",
    },
    orderList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    likesProductList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export { UserSchema };
