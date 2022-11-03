import { orderService } from "../services";

class OrderController {
  async addOrder(req, res) {
    const {
      buyer,
      productInfo,
      shippingStatus,
      shippingAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = req.body;

    if (
      !buyer ||
      !productInfo ||
      !shippingStatus ||
      !shippingAddress ||
      !totalAmount ||
      !recipientName ||
      !recipientPhoneNumber
    ) {
      return res.json("입력 데이터 부족");
    }

    const createdNewOrder = await productService.addProduct({
      buyer,
      productInfo,
      shippingStatus,
      shippingAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    });

    return res.json(createdNewOrder);
  }

  async getOrderList(req, res) {
    if (Object.keys(req.query).length === 0) {
      const orderList = await orderService.getOrderList();
      return res.json(orderList);
    } else {
      const { oid } = req.query;

      if (!oid) {
        return res.json("에러, 쿼리 스트링에 oid이 존재해야 함");
      }
      const oidArr = oid.split(",");
      const orderList = await orderService.getOrderList(oidArr);
      return res.json(orderList);
    }
  }

  async getOrder(req, res) {
    const { oid } = req.params;

    const order = await orderService.getOrderById(oid);
    res.json(order);
  }

  async editOrder(req, res) {
    const { oid } = req.params;
    const {
      buyer,
      productInfo,
      shippingStatus,
      shippingAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = req.body;

    if (
      !buyer ||
      !productInfo ||
      !shippingStatus ||
      !shippingAddress ||
      !totalAmount ||
      !recipientName ||
      !recipientPhoneNumber
    ) {
      return res.json("입력 데이터 부족");
    }

    const updatedOrder = await orderService.editOrder(oid, {
      shippingStatus,
      shippingAddress,
      recipientName,
      recipientPhoneNumber,
    });

    return res.json(updatedOrder);
  }

  async removeOrder(req, res, next) {
    const { oid } = req.params;

    try {
      await orderService.removeOrder(oid);
      res.json(`상품 삭제 완료(ID : ${oid})`);
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

export { orderController };
