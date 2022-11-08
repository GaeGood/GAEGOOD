function bodyEmptyChecker(req, res, next) {
  // req.body가 비어있는지 체크하는 미들웨어

  if (Object.keys(req.body).length === 0) {
    const e = new Error("req.body가 비어있습니다.");
    e.statusCode = 400;
    next(e);
  }

  next();
}

export { bodyEmptyChecker };
