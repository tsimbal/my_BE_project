export default {
  unauthorized(res) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      timestamps: Date.now(),
    });
  },
  badRequest(res, message, error = null) {
    return res.status(400).json({
      statusCode: 400,
      message,
      error,
    });
  },
  serverError(res, error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message || error,
    });
  },
};
