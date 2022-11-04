import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderInfo: {
      type: Array, // {productId, count} 묶음 array 생각중.
    },
    shippingStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
