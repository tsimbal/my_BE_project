import tokenService from '../service/token-service.js';

const auth = (req, res, next) => {
  if (req.meta === 'OPTIONS') return next();

  try {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
        timestamps: Date.now(),
      });

    const accessToken = authorization.split(' ')[1];
    if (!accessToken)
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
        timestamps: Date.now(),
      });

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData)
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
        timestamps: Date.now(),
      });

    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      timestamps: Date.now(),
    });
  }
};

export default auth;
