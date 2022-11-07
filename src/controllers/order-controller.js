import { orderService } from "../services";

class OrderController {
  async addOrder(req, res, next) {
    const {
      buyer,
      productList,
      countList,
      shippingStatus,
      shippingAddress,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = req.body;

    if (
      !buyer ||
      !productList ||
      !countList ||
      !shippingStatus ||
      !shippingAddress ||
      !totalAmount ||
      !recipientName ||
      !recipientPhoneNumber
    ) {
      return res.json("입력 데이터 부족");
    }

    try {
      const createdNewOrder = await orderService.addOrder({
        buyer,
        productList,
        countList,
        shippingStatus,
        shippingAddress,
        totalAmount,
        recipientName,
        recipientPhoneNumber,
      });
      return res.status(200).json(createdNewOrder);
    } catch (e) {
      next(e);
    }
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

  async getOrder(req, res, next) {
    const { oid } = req.params;

    if (!oid) {
      return res.status(400).json("입력 값이 부족합니다.");
    }

    try {
      const order = await orderService.getOrderById(oid);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  async editOrder(req, res) {
    const { oid } = req.params;
    const { shippingAddress, recipientName, recipientPhoneNumber } = req.body;

    if (!shippingAddress || !recipientName || !recipientPhoneNumber) {
      return res.json("입력 데이터 부족");
    }

    const updatedOrder = await orderService.editOrder(oid, {
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
