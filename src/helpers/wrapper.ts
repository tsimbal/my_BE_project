import { Request, Response, NextFunction } from 'express';
import errorService from '../service/error-service';
const ctrlWrapper = (
  ctrl: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error: unknown) {
      const typedError = error as Error;

      errorService.serverError(res, typedError);
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
