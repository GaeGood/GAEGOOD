import { orderModel } from "../db";

class OrderService {
  async addOrder(orderInfo) {
    const {
      buyer,
      productList,
      countList,
      shippingStatus,
      shippingAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = orderInfo;

    if (productList.length !== countList.length) {
      const error = new Error("상품의 갯수와 수량의 갯수가 다릅니다.");
      error.statusCode = 400;
      throw error;
    }

    if (totalAmount < 0) {
      const error = new Error("가격이 올바르지 않습니다.");
      error.statusCode = 401;
      throw error;
    }
    try {
      const createdNewOrder = await orderModel.create(orderInfo);
      return createdNewOrder;
    } catch (err) {
      const error = new Error("주문생성이 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async getOrderById(oid) {
    try {
      const order = await orderModel.findById(oid);
      return order;
    } catch (err) {
      const error = new Error("ID 기반 주문 조회에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async getOrderList(oidArr) {
    try {
      if (!oidArr) {
        const orderList = await orderModel.findAll();
        return orderList;
      } else {
        const orderList = await orderModel.findByIds(oidArr);
        return orderList;
      }
    } catch (err) {
      const error = new Error(
        "주문리스트를 불러오는 과정에서 에러가 발생하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async editOrder(oid, orderInfo) {
    const { shippingAddress, recipientName, recipientPhoneNumber } = orderInfo;
    try {
      const updatedNewOrder = await orderModel.update(oid, orderInfo);
      return updatedNewOrder;
    } catch (err) {
      const error = new Error("주문 수정과정에서 에러가 발생하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async removeOrder(oid) {
    try {
      await orderModel.delete(oid);
    } catch (err) {
      const error = new Error("주문 삭제과정에서 에러가 발생하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
