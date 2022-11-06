function errorHandler(error, req, res, next) {
  if (error) {
    return res.status(400).json(error.message);
  }
}

export { errorHandler };
