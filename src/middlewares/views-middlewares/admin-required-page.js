function adminRequiredPage(req, res, next) {
  const payload = req.tokenPayload;

  if (payload.role !== "admin") {
    return res.status(500).redirect("/error-page/admin-required");
  }

  next();
}
export { adminRequiredPage };
