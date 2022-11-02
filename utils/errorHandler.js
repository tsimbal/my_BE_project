export default (res, error) => {
  res.status(500).json({
    statusCode: 500,
    message: error.message ? error.message : error,
  });
};
