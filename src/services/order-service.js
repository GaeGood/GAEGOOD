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
    const { shippingAddress, recipientName, recipientPhoneNumber } = orderInfo;

    const updatedNewOrder = await orderModel.update(oid, orderInfo);
    return updatedNewOrder;
  }

  async removeOrder(oid) {
    await orderModel.delete(oid);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
