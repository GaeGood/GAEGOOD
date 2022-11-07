function errorHandler(error, req, res, next) {
  if (error) {
    return res.status(error.statusCode).json(error.message);
  }
}

export { errorHandler };
