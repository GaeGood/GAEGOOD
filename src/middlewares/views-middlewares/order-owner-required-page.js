import { orderModel } from "../../db";

async function orderOwnerRequiredPage(req, res, next) {
  //user-controller 전에 사용되는 미들웨어

  const { oid } = req.params;

  const order = await orderModel.findById(oid);

  let loggedInUserIsOwner = false;

  if (String(order.buyer._id) === String(req.loggedInUser._id)) {
    loggedInUserIsOwner = true;
  }

  if (req.tokenPayload.role !== "admin" && !loggedInUserIsOwner) {
    return res.status(500).redirect("/error-page/order-owner-required");
  }
  next();
}

export { orderOwnerRequiredPage };
