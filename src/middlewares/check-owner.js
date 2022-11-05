function checkOwner(req, res, next) {
  //user-controller 전에 사용되는 미들웨어

  const { userId } = req.params;
  if (
    req.tokenPayload.role !== "admin" &&
    req.loggedInUser._id.toString() !== userId
  ) {
    return res.json({
      resCode: 401,
      resMsg: {
        msg: "로그인 유저정보가 불일치해 User 정보를 부를 수 없습니다. 이 경우 관리자만 User 정보를 확인 가능합니다.",
      },
    });
  }
  next();
}

export { checkOwner };
