import errorService from '../service/error-service.js';
import tokenService from '../service/token-service.js';

const auth = (req, res, next) => {
  if (req.meta === 'OPTIONS') return next();

  try {
    const authorization = req.headers.authorization;
    if (!authorization) return errorService.unauthorized(res);

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) return errorService.unauthorized(res);

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return errorService.unauthorized(res);

    req.user = userData;
    next();
  } catch (err) {
    return errorService.unauthorized(res);
  }
};

export default auth;
