import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";
import { productModel } from "../index";

const Order = model("Order", OrderSchema);

class OrderModel {
  async findById(oid) {
    const order = await Order.findOne({ _id: oid })
      .populate("buyer")
      .populate("productList");
    return order;
  }

  async findByIds(oidArr) {
    const orderList = new Array();

    for (const oid of oidArr) {
      const order = await Order.findOne({ _id: oid })
        .populate("buyer")
        .populate("productList");
      if (order) {
        orderList.push(order);
      }
    }

    return orderList;
  }

  async findAll() {
    const orderList = await Order.find({})
      .populate("buyer")
      .populate("productList");
    return orderList;
  }

  async create(orderInfo) {
    let createdNewOrder = await Order.create(orderInfo);
    createdNewOrder = await createdNewOrder.populate("buyer");
    createdNewOrder = await createdNewOrder.populate("productList");
    return createdNewOrder;
  }

  async update(oid, orderInfo) {
    const filter = { _id: oid };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, orderInfo, option)
      .populate("buyer")
      .populate("productList");
    return updatedOrder;
  }

  async delete(oid) {
    await Order.deleteOne({ _id: oid });
  }
}

const orderModel = new OrderModel();

export { orderModel };
