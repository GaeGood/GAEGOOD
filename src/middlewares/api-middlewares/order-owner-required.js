import { orderModel } from "../../db";

async function orderOwnerRequired(req, res, next) {
  //user-controller 전에 사용되는 미들웨어

  const { oid } = req.params;

  const order = await orderModel.findById(oid);

  let loggedInUserIsOwner = false;

  if (String(order.buyer._id) === String(req.loggedInUser._id)) {
    loggedInUserIsOwner = true;
  }

  if (req.tokenPayload.role !== "admin" && !loggedInUserIsOwner) {
    const e = new Error(
      "주문의 소유자가 아니므로, 이 API에 대한 사용을 불허합니다."
    );
    e.statusCode = 401;
    next(e);
  }
  next();
}

export { orderOwnerRequired };
