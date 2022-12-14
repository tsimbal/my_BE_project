import { IUserDto } from './../types/user/IUserDto';
import { Request, Response, NextFunction } from 'express';

import errorService from '../service/error-service';
import tokenService from '../service/token-service';

declare module 'express' {
  interface Request {
    meta?: string;
    user?: IUserDto | null | unknown;
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
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
