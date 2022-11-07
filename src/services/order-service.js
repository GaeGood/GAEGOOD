import { orderModel } from "../db";

class OrderService {
  async addOrder(orderInfo) {
    const {
      buyer,
      productList,
      countList,
      shippingStatus,
      shippingPostCode,
      shippingStreetAddress,
      shippingExtraAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = orderInfo;

    if (productList.length !== countList.length) {
      throw new Error("상품의 갯수와 수량의 갯수가 다릅니다.");
    }

    const createdNewOrder = await orderModel.create(orderInfo);
    return createdNewOrder;
  }

  async getOrderById(oid) {
    const order = await orderModel.findById(oid);
    return order;
  }

  async getOrderList(oidArr) {
    if (!oidArr) {
      const orderList = await orderModel.findAll();
      return orderList;
    } else {
      const orderList = await orderModel.findByIds(oidArr);
      return orderList;
    }
  }

  async editOrder(oid, orderInfo) {
    const {
      shippingPostCode,
      shippingStreetAddress,
      shippingExtraAddress,
      recipientName,
      recipientPhoneNumber,
    } = orderInfo;

    const updatedNewOrder = await orderModel.update(oid, orderInfo);
    return updatedNewOrder;
  }

  async removeOrder(oid) {
    await orderModel.delete(oid);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
