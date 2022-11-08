import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("Order", OrderSchema);

class OrderModel {
  async findById(oid) {
    try {
      const order = await Order.findOne({ _id: oid })
        .populate("buyer")
        .populate("productList");
      return order;
    } catch (err) {
      const error = new Error("ID 기반으로 주문을 검색하는 과정에서 에러발생");
      error.statusCode = 400;
      throw error;
    }
  }

  async findByIds(oidArr) {
    const orderList = new Array();
    try {
      for (const oid of oidArr) {
        const order = await Order.findOne({ _id: oid })
          .populate("buyer")
          .populate("productList");
        if (order) {
          orderList.push(order);
        }
      }
    } catch (err) {
      const error = new Error("주문리스트를 불러오는 과정에서 에러발생");
      error.statusCode = 400;
      throw error;
    }

    return orderList;
  }

  async findAll() {
    try {
      const orderList = await Order.find({})
        .populate("buyer")
        .populate("productList");
      return orderList;
    } catch (err) {
      const error = new Error("주문 전체목록을 불러들이는데 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async create(orderInfo, buyerFromDB) {
    try {
      let createdNewOrder = await Order.create(orderInfo);
      await buyerFromDB.orderList.push(createdNewOrder);
      await buyerFromDB.save();
      createdNewOrder = await createdNewOrder.populate("buyer");
      createdNewOrder = await createdNewOrder.populate("productList");

      return createdNewOrder;
    } catch (e) {
      e.message = "상품 생성 실패 DB 오류";
      e.statusCode = 403;
      throw e;
    }
  }

  async update(oid, orderInfo) {
    const filter = { _id: oid };
    const option = { returnOriginal: false };
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        orderInfo,
        option
      )
        .populate("buyer")
        .populate("productList");
      return updatedOrder;
    } catch (err) {
      const error = new Error("주문 수정 시도중 에러발생!");
      error.statusCode = 400;
      throw error;
    }
  }

  async delete(oid) {
    try {
      await Order.deleteOne({ _id: oid });
    } catch (err) {
      const error = new Error("주문 삭제 실패 !");
      error.statusCode = 400;
      throw error;
    }
  }
}

const orderModel = new OrderModel();

export { orderModel };
