import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("Order", OrderSchema);

class OrderModel {
  async findById(oid) {
    const order = await Order.findOne({ id: oid });
    return order;
  }

  async findByIds(oidArr) {
    const orderList = new Array();

    for (const oid of oidArr) {
      const order = await Order.findOne({ _id: oid });
      if (order) {
        orderList.push(order);
      }
    }

    return orderList;
  }

  async findAll() {
    const orderList = await Order.find({});
    return orderList;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async update(oid, orderInfo) {
    const filter = { _id: oid };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(
      filter,
      orderInfo,
      option
    );
    return updatedOrder;
  }

  async delete(oid) {
    await Order.deleteOne({ _id: oid });
  }
}

const orderModel = new OrderModel();

export { orderModel };
