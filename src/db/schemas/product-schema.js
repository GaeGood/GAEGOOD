import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    smallImageURL: {
      type: String,
      required: true,
    },
    bigImageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export { ProductSchema };
