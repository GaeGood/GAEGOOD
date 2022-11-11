function userOwnRequired(req, res, next) {
  //user-controller 전에 사용되는 미들웨어

  const { userId } = req.params;

  if (
    req.tokenPayload.role !== "admin" &&
    req.loggedInUser._id.toString() !== userId
  ) {
    const e = new Error(
      "유저 정보가 일치하지 않아, 이 API에 대한 사용을 불허합니다."
    );
    e.statusCode = 401;
    next(e);
  }
  next();
}

export { userOwnRequired };
