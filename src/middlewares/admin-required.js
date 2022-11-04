function adminRequired(req, res, next) {
  const payload = req.tokenPayload;

  if (payload.role !== "admin") {
    return res.status(401).json({
      msg: "Not Admin User!",
    });
  }
  next();
}
export { adminRequired };
