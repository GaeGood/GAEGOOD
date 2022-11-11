function adminRequired(req, res, next) {
  const payload = req.tokenPayload;

  if (payload.role !== "admin") {
    const e = new Error(
      "관리자 권한이 없으므로, 이 API에 대한 사용을 불허합니다."
    );
    e.statusCode = 401;
    next(e);
  }
  next();
}
export { adminRequired };
