import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // productInfo: {
    //   type: new Schema([
    //     {
    //       product: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Product",
    //         required: true,
    //       },
    //       count: { type: Number, required: true },
    //     },
    //     {
    //       _id: false,
    //     },
    //   ]),
    //   required: true,
    // },
    shippingStatus: {
      type: String,
      default: "배송준비중",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientPhoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
