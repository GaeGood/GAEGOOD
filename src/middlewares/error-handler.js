function errorHandler(error, req, res, next) {
  if (error) {
    return res.json(error.message);
  }
}

export { errorHandler };
