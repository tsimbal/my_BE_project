const addedHeaders = (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization, Cookie'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
};

export default addedHeaders;
